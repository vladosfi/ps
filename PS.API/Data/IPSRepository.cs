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

        Task<EventImage> GetMainImageForEvent(int eventId);

        Task<Like> GetLike(int userId, int recipientId);

        Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams);

        Task<Image> GetImage(string id);

        Task<EventImage> GetEventImage(int imageId);        

        Task<Painting> GetPaintingById(string id);

        Task<Painting> AddPainting(Painting painting);

        Task<PagedList<Event>> GetEvents(EventParams eventParams);

        Task<Event> GetEventById(int id);

        Task<Event> AddEvent(Event eventEntity);
    }
}