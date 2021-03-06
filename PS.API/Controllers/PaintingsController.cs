using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using PS.API.Data;
using PS.API.Dtos;
using PS.API.Helpers;
using PS.API.Models;
using PS.API.Dtos.Painting;

namespace PS.API.Controllers
{
    [Route("api/paintings")]
    [ApiController]
    public class PaintingsController : ControllerBase
    {
        private const int notFound = 404;
        private string imagesUplaoadFolderPath = "uploads/images";
        private const string couldNotAddPainting = "Could not add the painting!";
        private const string couldNotAddImage = "Could not add the image!";
        private const string invalidFileLength = "Could not add the image. Invalid file length!";
        private const string alreadyMainImage = "This is already the main image";
        private const string couldNotSetMainImage = "Could not set image to main";
        private const string couldNotDeleteImage = "Could not delete image";
        private const string cannotDeleteMainImage = "You cannot delete main image";
        private const string failedToDeleteImage = "Failed to delete image";
        private const string failedToUpdatePainting = "Failed to update painting";
        private const string paintingUpdateFailed = "Update painting {0} failed on save";
        private const string paintingsUpdatingFailed = "Update paintings failed on save";
        private const string couldNotDeletePainting = "You cannot delete painting";
        private const string failedToDeletePainting = "Failed to delete painting";
        private const string failedToUpdatePaintingPosition = "Failed to update painting position";
        private const string thumbnailFolder = "thumbnail";
        private const int maxThumbnailSize = 250;

        private readonly IPSRepository repo;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment host;

        public PaintingsController(
            IPSRepository repo,
            IMapper mapper,
            IWebHostEnvironment host)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.host = host;
        }

        [HttpGet]
        public async Task<IActionResult> GetPaintings([FromQuery] PaintingParams paintingParams)
        {
            var paintings = await this.repo.GetPapintings(paintingParams);

            var pantingsToReturn = this.mapper.Map<IEnumerable<PaintingForListDto>>(paintings);

            Response.AddPagination(paintings.CurrentPage, paintings.PageSize, paintings.TotalCount, paintings.TotalPages);

            return Ok(pantingsToReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPainting(string id, [FromQuery] PaintingParams paintingParams)
        {

            var currentLanguage = paintingParams?.Language.ToLower();

            var painting = await this.repo.GetPaintingById(id);

            painting.Name = currentLanguage == "bg" ? painting.Name :
                currentLanguage == "de" ? painting.NameDe :
                currentLanguage == "ru" ? painting.NameRu : painting.NameGb;

            painting.Description = currentLanguage == "bg" ? painting.Description :
                    currentLanguage == "de" ? painting.DescriptionDe :
                    currentLanguage == "ru" ? painting.DescriptionRu : painting.DescriptionGb;
            
            painting.ViewCount++;                
                        
            var paintingToReturn = this.mapper.Map<PaintingForDetailsDto>(painting);


            if (paintingToReturn != null)
            {
                await this.repo.SaveAll();
                return Ok(paintingToReturn);
            }

            return BadRequest(notFound);
        }

        [Authorize]
        [HttpGet("edit/{id}")]
        public async Task<IActionResult> GetPaintingForEdit(string id)
        {

            var painting = await this.repo.GetPaintingByIdOrdered(id);

            var paintingToReturn = this.mapper.Map<PaintingForEditDetailsDto>(painting);

            if (paintingToReturn != null)
            {
                return Ok(paintingToReturn);
            }

            return BadRequest(notFound);
        }


        [Authorize]
        [HttpPost("{userId}")]
        public async Task<IActionResult> AddPainting(int userId, [FromBody] PaintingForCreationDto paintingForCreationDto)
        {
            var paintingToAdd = this.mapper.Map<Painting>(paintingForCreationDto);
            var lastPaintingPosition = await this.repo.GetLastPaintingPosition();


            paintingToAdd.Position = ++lastPaintingPosition;

            var createdPainting = await this.repo.AddPainting(paintingToAdd);

            if (createdPainting != null)
            {
                var paintingToReturn = this.mapper.Map<PaintingForDetailsDto>(createdPainting);

                return CreatedAtAction(nameof(this.GetPainting), new { controller = "Paintings", id = paintingToReturn.Id }, paintingToReturn);
            }

            return BadRequest(couldNotAddPainting);
        }


        [HttpGet("image/{id}")]
        [ActionName(nameof(GetImage))]
        public async Task<IActionResult> GetImage(string id)
        {
            var imageFromRepo = await this.repo.GetImage(id);

            return Ok(imageFromRepo);
        }

        [Authorize]
        [HttpPost("{paintingId}/images")]
        public async Task<IActionResult> AddImagesForPainting(string paintingId, [FromForm] PaintingImageForCreateInputModel imageForCreateDto)
        {
            var currentPainting = await this.repo.GetPaintingByIdOrdered(paintingId);

            if (currentPainting == null)
            {
                return BadRequest(couldNotAddImage);
            }

            if (imageForCreateDto.File.Length <= 0)
            {
                return BadRequest(invalidFileLength);
            }

            imagesUplaoadFolderPath += $"/{DateTime.UtcNow.Year.ToString()}/{DateTime.UtcNow.Month.ToString()}";

            var uploadsFolderPath = Path.Combine(host.WebRootPath, imagesUplaoadFolderPath);

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var imageToAdd = new Image();
            var uploadedFileExtension = Path.GetExtension(imageForCreateDto.File.FileName);
            imageToAdd.ImageFileName = imageToAdd.Id + uploadedFileExtension;
            imageToAdd.Url = imagesUplaoadFolderPath;
            imageToAdd.Name = currentPainting.Name;

            var fileName = imageToAdd.Id + uploadedFileExtension;
            var filePath = Path.Combine(uploadsFolderPath, fileName);


            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageForCreateDto.File.CopyToAsync(stream);
            }

            ThumbnailGenerator.GenerateThumbnail(uploadsFolderPath, fileName, thumbnailFolder, maxThumbnailSize);

            if (await this.repo.GetMainImageForPainting(paintingId) == null)
            {
                imageToAdd.IsMain = true;
            }

            currentPainting.Images.Add(imageToAdd);

            if (await this.repo.SaveAll())
            {
                return CreatedAtAction(nameof(this.GetImage), new { controller = "Paintings", id = imageToAdd.Id }, imageToAdd);
            }


            return BadRequest(couldNotAddImage);
        }

        [Authorize]
        [HttpPost("{paintingId}/setMainImage/{imageId}")]
        public async Task<IActionResult> SetMainPhoto(string paintingId, string imageId)
        {
            var paintingFromRepo = await this.repo.GetPaintingById(paintingId);

            if (paintingFromRepo == null)
            {
                return BadRequest(couldNotSetMainImage);
            }

            if (!paintingFromRepo.Images.Any(i => i.Id == imageId))
            {
                return BadRequest(couldNotSetMainImage);
            }

            var imageFromRepo = await this.repo.GetImage(imageId);

            if (imageFromRepo.IsMain)
            {
                return BadRequest(alreadyMainImage);
            }

            var currentManImage = await this.repo.GetMainImageForPainting(paintingId);
            currentManImage.IsMain = false;
            imageFromRepo.IsMain = true;

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest(couldNotSetMainImage);

        }

        [Authorize]
        [HttpDelete("{paintingId}/delete/{imageId}")]
        public async Task<IActionResult> DeletePhoto(string paintingId, string imageId)
        {
            var paintingFromRepo = await this.repo.GetPaintingById(paintingId);

            if (paintingFromRepo == null)
            {
                return BadRequest(couldNotDeleteImage);
            }

            if (!paintingFromRepo.Images.Any(i => i.Id == imageId))
            {
                return BadRequest(couldNotDeleteImage);
            }

            var imageFromRepo = await this.repo.GetImage(imageId);

            if (imageFromRepo.IsMain)
            {
                return BadRequest(cannotDeleteMainImage);
            }

            var imagePath = Path.Combine(imageFromRepo.Url, imageFromRepo.ImageFileName);
            imagePath = Path.Combine(host.WebRootPath, imagePath);
            var thumbnailImage = Path.Combine(host.WebRootPath, imageFromRepo.Url);
            thumbnailImage = Path.Combine(thumbnailImage, thumbnailFolder);
            thumbnailImage = Path.Combine(thumbnailImage, imageFromRepo.ImageFileName);

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
            if (System.IO.File.Exists(thumbnailImage))
            {
                System.IO.File.Delete(thumbnailImage);
            }

            this.repo.Delete(imageFromRepo);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest(failedToDeleteImage);
        }

        [Authorize]
        [HttpPut("position")]
        public async Task<IActionResult> UpdatePosition(ICollection<PaintingForUpdatePaintingPositionDto> paintingForDetailsDto)
        {
            var paintingIds = paintingForDetailsDto.Select(i => i.Id).ToList();

            var paintingsFromRepo = await this.repo.GetPaintingByIds(paintingIds);

            foreach (var painting in paintingForDetailsDto)
            {
                var currentPainting = paintingsFromRepo.FirstOrDefault(p => p.Id == painting.Id);
                if (currentPainting != null)
                {
                    currentPainting.Position = painting.Position;
                }
            }

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest(failedToUpdatePaintingPosition);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, PaintingForUpdateDto paintingForDetailsDto)
        {
            var paintingFromRepo = await this.repo.GetPaintingByIdOrdered(id);

            if (paintingFromRepo == null)
            {
                return BadRequest(failedToUpdatePainting);
            }

            this.mapper.Map(paintingForDetailsDto, paintingFromRepo);

            paintingFromRepo.ModifiedOn = DateTime.UtcNow;

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception(string.Format(paintingUpdateFailed, id));
        }

        [Authorize]
        [HttpDelete("{paintingId}/delete")]
        public async Task<IActionResult> Delete(string paintingId)
        {
            var paintingFromRepo = await this.repo.GetPaintingById(paintingId);

            if (paintingFromRepo == null)
            {
                return BadRequest(couldNotDeletePainting);
            }

            foreach (var image in paintingFromRepo.Images)
            {
                var imagePath = Path.Combine(image.Url, image.ImageFileName);
                imagePath = Path.Combine(host.WebRootPath, imagePath);
                var thumbnailImage = Path.Combine(host.WebRootPath, image.Url);
                thumbnailImage = Path.Combine(thumbnailImage, thumbnailFolder);
                thumbnailImage = Path.Combine(thumbnailImage, image.ImageFileName);

                if (System.IO.File.Exists(imagePath) && System.IO.File.Exists(thumbnailImage))
                {
                    System.IO.File.Delete(imagePath);
                    System.IO.File.Delete(thumbnailImage);

                    var imageFile = new FileInfo(imagePath);
                    imageFile.Delete();
                    var thumbnailFile = new FileInfo(thumbnailImage);
                    thumbnailFile.Delete();
                }

                this.repo.Delete(image);
            }

            this.repo.Delete(paintingFromRepo);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest(failedToDeletePainting);
        }
    }
}