using System.Collections.Generic;
using System.Threading.Tasks;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Data
{
    public interface IEventsRepository
    {
        Task<EventImage> GetMainImageForEvent(int eventId);

        Task<EventImage> GetEventImage(string imageId);

        Task<PagedList<Event>> GetEvents(EventParams eventParams);

        Task<ICollection<Event>> GetLatestEvents();

        Task<Event> GetEventById(int id);

        Task IncreaseEventViews(int id);

        Task<Event> AddEvent(Event eventEntity);
    }
}