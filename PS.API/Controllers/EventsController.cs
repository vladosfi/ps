using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        private const string failedToDeleteEvent = "Failed to delete painting";
        private readonly IPSRepository repo;
        private readonly IMapper mapper;

        public EventsController(IPSRepository repo,
            IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
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
    }
}