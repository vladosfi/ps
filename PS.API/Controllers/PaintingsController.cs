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
        public async Task<IActionResult> AddPainting(int userId, [FromBody]  PaintingForAddPaintingDto paintingForAddPaintingDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var paintingToAdd = this.mapper.Map<Painting>(paintingForAddPaintingDto);

            var createdPainting = await this.repo.AddPainting(paintingToAdd);

            if (createdPainting != null)
            {
                var paintingToReturn = this.mapper.Map<PaintingForDetailsDto>(createdPainting);

                return CreatedAtAction(nameof(this.GetPainting), new { controller = "Paintings", id = paintingToReturn.Id }, paintingToReturn);
            }

            return BadRequest(couldNotAddPainting);
        }

        [Authorize]
        [HttpPost("{userId}/images")]
        public async Task<IActionResult> AddImagesForPainting(int userId, [FromForm] ImageForAddPaintingDto imageForAddPaintingDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            imagesUplaoadFolderPath += $"/{DateTime.Now.Year.ToString()}/{DateTime.Now.Month.ToString()}";

            var uploadsFolderPath = Path.Combine(host.WebRootPath, imagesUplaoadFolderPath);

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageForAddPaintingDto.File.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            if (imageForAddPaintingDto.File.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageForAddPaintingDto.File.CopyToAsync(stream);
                }
            }

            //Create Thumbnail table for images connected to images one to many
            // Image image = Image.FromFile(fileName);
            // Image thumb = image.GetThumbnailImage(120, 120, ()=>false, IntPtr.Zero);
            // thumb.Save(Path.ChangeExtension(fileName, "thumb"));

            var imageToAdd = this.mapper.Map<Image>(imageForAddPaintingDto);
            //var createdPainting = await this.repo.AddImage(imageToAdd);


            //imageToAdd.Name = "123wd1e";
            // imageToAdd.Description = "asdasdasdasdasd";
            // imageToAdd.Available = true;



            // if (createdPainting != null)
            // {
            //     var paintingToReturn = this.mapper.Map<PaintingForDetailsDto>(createdPainting);

            //     return CreatedAtAction(nameof(this.GetPainting), new { controller="Paintings", id = paintingToReturn.Id }, paintingToReturn);
            // }

            return BadRequest(couldNotAddPainting);
        }
    }
}