using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Data
{
    public class EventsRepository : IEventsRepository
    {
        private const int latestEvents = 3;

        private readonly DataContext context;
        private readonly IPSRepository repo;

        public EventsRepository(DataContext context, IPSRepository repo)
        {
            this.context = context;
            this.repo = repo;
        }

        public async Task<ICollection<Event>> GetLatestEvents()
        {
            return await this.context.Events.Include(e => e.Images).OrderByDescending(e => e.CreatedOn).Take(latestEvents).ToListAsync();
        }

        public async Task<PagedList<Event>> GetEvents(EventParams eventParams)
        {
            var events = this.context.Events.Include(e => e.Images).OrderByDescending(e => e.CreatedOn).AsQueryable();

            return await PagedList<Event>.CreateAsync(events, eventParams.PageNumber, eventParams.PageSize);
        }

        public async Task<EventImage> GetMainImageForEvent(int eventId)
        {
            return await this.context.EventImages.Where(e => e.EventId == eventId).FirstOrDefaultAsync(i => i.IsMain == true);
        }
        public async Task<EventImage> GetEventImage(string imageId)
        {
            var image = await this.context.EventImages.FirstOrDefaultAsync(i => i.Id == imageId);

            return image;
        }

        public async Task<Event> GetEventById(int id)
        {
            var eventEntity = await this.context.Events.Include(p => p.Images).FirstOrDefaultAsync(e => e.Id == id);
            return eventEntity;
        }

        public async Task IncreaseEventViews(int id)
        {
            var eventEntity = await this.context.Events.FirstOrDefaultAsync(e => e.Id == id);
            ++eventEntity.ViewCount;
            await this.repo.SaveAll();
        }

        public async Task<Event> AddEvent(Event eventEntity)
        {
            await this.context.Events.AddAsync(eventEntity);

            if (await this.repo.SaveAll())
            {
                return eventEntity;
            }

            return null;
        }


    }
}