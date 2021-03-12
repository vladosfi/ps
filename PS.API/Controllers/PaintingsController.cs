using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using PS.API.Data;
using PS.API.Dtos;
using PS.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;
using PS.API.Models;

namespace PS.API.Controllers
{
    [Route("api/paintings")]
    [ApiController]
    public class PaintingsController : ControllerBase
    {
        private string imagesUplaoadFolderPath = "uploads/images";
        private const string couldNotAddPainting = "Could not add the painting!";
        private const string couldNotAddImage = "Could not add the image!";

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
        public async Task<IActionResult> GetPainting(string id)
        {

            var painting = await this.repo.GetPaintingById(id);

            var paintingToReturn = this.mapper.Map<PaintingForDetailsDto>(painting);

            return Ok(paintingToReturn);
        }


        [Authorize]
        [HttpPost("{userId}")]
        public async Task<IActionResult> AddPainting(int userId, [FromBody] PaintingForAddPaintingDto paintingForAddPaintingDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }

            var paintingToAdd = this.mapper.Map<Painting>(paintingForAddPaintingDto);

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
        public async Task<IActionResult> GetImage(int id)
        {
            var imageFromRepo = await this.repo.GetImage(id);

            return Ok(imageFromRepo);
        }

        [Authorize]
        [HttpPost("{paintingId}/images")]
        public async Task<IActionResult> AddImagesForPainting(string paintingId, [FromForm] ImageForCreateDto ImageForCreateDto)
        {
            var currentPainting = await this.repo.GetPaintingById(paintingId);

            if (currentPainting == null)
            {
                return BadRequest(couldNotAddImage);
            }

            imagesUplaoadFolderPath += $"/{DateTime.Now.Year.ToString()}/{DateTime.Now.Month.ToString()}";

            var uploadsFolderPath = Path.Combine(host.WebRootPath, imagesUplaoadFolderPath);

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(ImageForCreateDto.File.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            if (ImageForCreateDto.File.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await ImageForCreateDto.File.CopyToAsync(stream);
                }
            }

            //Create Thumbnail table for images connected to images one to many
            // Image image = Image.FromFile(fileName);
            // Image thumb = image.GetThumbnailImage(120, 120, ()=>false, IntPtr.Zero);
            // thumb.Save(Path.ChangeExtension(fileName, "thumb"));

            var imageToAdd = this.mapper.Map<Image>(ImageForCreateDto);
            imageToAdd.Url = filePath;
            imageToAdd.Name = currentPainting.Name;
            currentPainting.Images.Add(imageToAdd);

            if (await this.repo.SaveAll())
            {
                return CreatedAtAction(nameof(this.GetImage), new { controller = "Paintings", id = imageToAdd.Id }, imageToAdd);
            }


            return BadRequest(couldNotAddPainting);
        }
    }
}