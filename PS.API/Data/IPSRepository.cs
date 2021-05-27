using System.Collections.Generic;
using System.Threading.Tasks;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Data
{
    public interface IPSRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<User> GetUser(int id);

        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Image> GetMainImageForPainting(string paintingId);

        Task<Like> GetLike(int userId, int recipientId);

        Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams);

        Task<Image> GetImage(string id);

        Task<Painting> GetPaintingById(string id);
        Task IncreasePaintingViews(string id);

        Task<Painting> AddPainting(Painting painting);

        Task<EventImage> GetMainImageForEvent(int eventId);
        
        Task<EventImage> GetEventImage(string imageId);        

        Task<PagedList<Event>> GetEvents(EventParams eventParams);
        
        Task<ICollection<Event>> GetLatestEvents();

        Task<Event> GetEventById(int id);

        Task IncreaseEventViews(int id);

        Task<Event> AddEvent(Event eventEntity);
    }
}