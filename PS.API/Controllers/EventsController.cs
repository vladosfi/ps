using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Collections.Generic;
using PS.API.Data;
using PS.API.Dtos;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private const int notFound = 404;

        private const string couldNotAddEvent = "Could not add the event!";
        private const string failedToDeleteEvent = "Failed to delete event";
        private string imagesUplaoadFolderPath = "uploads/events/images";
        private const string couldNotAddImage = "Could not add the image!";
        private const string invalidFileLength = "Could not add the image. Invalid file length!";
        private const string alreadyMainImage = "This is already the main image";
        private const string couldNotSetMainImage = "Could not set image to main";
        private const string couldNotDeleteImage = "Could not delete image";
        private const string cannotDeleteMainImage = "You cannot delete main image";
        private const string failedToDeleteImage = "Failed to delete image";
        private const string thumbnailFolder = "thumbnail";
        private const int maxThumbnailSize = 250;
        private readonly IPSRepository repo;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment host;


        public EventsController(IPSRepository repo,
            IMapper mapper,
            IWebHostEnvironment host)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.host = host;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] EventParams eventParams)
        {
            var eventsFromRepo = await this.repo.GetEvents(eventParams);
            var eventsToReturn = this.mapper.Map<IEnumerable<EventsForListDto>>(eventsFromRepo);

            if (eventsToReturn != null)
            {
                Response.AddPagination(eventsFromRepo.CurrentPage, eventsFromRepo.PageSize, eventsFromRepo.TotalCount, eventsFromRepo.TotalPages);
                return Ok(eventsToReturn);
            }

            return BadRequest(notFound);
        }

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEventById(int eventId)
        {
            var eventFromRepo = await this.repo.GetEventById(eventId);
            var eventToReturn = this.mapper.Map<EventDetailsDto>(eventFromRepo);

            if (eventToReturn != null)
            {
                return Ok(eventToReturn);
            }

            return BadRequest(notFound);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddEvent([FromBody] EventForCreationDto eventForAddDto)
        {
            var eventForCreation = this.mapper.Map<Event>(eventForAddDto);
            var eventFromRepo = await this.repo.AddEvent(eventForCreation);

            if (eventFromRepo != null)
            {
                var eventToReturn = this.mapper.Map<EventDetailsDto>(eventFromRepo);
                return Ok(eventToReturn);
            }

            return BadRequest(couldNotAddEvent);
        }


        [HttpPut("{eventId}")]
        [Authorize]
        public async Task<IActionResult> UpdateEvent(int eventId, [FromBody] EventForCreationDto eventForUpdate)
        {
            var eventFromRepo = await this.repo.GetEventById(eventId);

            if (eventFromRepo == null)
            {
                return BadRequest(notFound);
            }

            this.mapper.Map(eventForUpdate, eventFromRepo);
            eventFromRepo.ModifiedOn = DateTime.UtcNow;

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest(notFound);
        }

        [HttpDelete("{eventId}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            var eventFromRepo = await this.repo.GetEventById(eventId);

            if (eventFromRepo == null)
            {
                return BadRequest(notFound);
            }

            this.repo.Delete(eventFromRepo);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest(failedToDeleteEvent);
        }

        [Authorize]
        [HttpPost("{eventId}/images")]
        public async Task<IActionResult> AddImagesForEvent(int eventId, [FromForm] ImageForCreateDto ImageForCreateDto)
        {
            var currentEvent = await this.repo.GetEventById(eventId);

            if (currentEvent == null)
            {
                return BadRequest(couldNotAddImage);
            }

            if (ImageForCreateDto.File.Length <= 0)
            {
                return BadRequest(invalidFileLength);
            }

            imagesUplaoadFolderPath += $"/{currentEvent.Id}";

            var uploadsFolderPath = Path.Combine(host.WebRootPath, imagesUplaoadFolderPath);

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var imageToAdd = new EventImage();
            var uploadedFileExtension = Path.GetExtension(ImageForCreateDto.File.FileName);
            imageToAdd.ImageFileName = imageToAdd.Id + uploadedFileExtension;
            imageToAdd.Url = imagesUplaoadFolderPath;
            imageToAdd.Name = currentEvent.Name;

            var fileName = imageToAdd.Id + uploadedFileExtension;
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await ImageForCreateDto.File.CopyToAsync(stream);
            }

            ThumbnailGenerator.GenerateThumbnail(uploadsFolderPath, fileName, thumbnailFolder, maxThumbnailSize);

            if (await this.repo.GetMainImageForEvent(eventId) == null)
            {
                imageToAdd.IsMain = true;
            }

            currentEvent.Images.Add(imageToAdd);

            if (await this.repo.SaveAll())
            {
                return CreatedAtAction(nameof(this.GetImage), new { controller = "Events", imageId = imageToAdd.Id }, imageToAdd);
            }

            //await stream.DisposeAsync();

            return BadRequest(couldNotAddImage);
        }

        [HttpGet("image/{imageId}")]
        [ActionName(nameof(GetImage))]
        public async Task<IActionResult> GetImage(int imageId)
        {
            var imageFromRepo = await this.repo.GetEventImage(imageId);

            return Ok(imageFromRepo);
        }
    }
}