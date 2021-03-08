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

        Task<Like> GetLike(int userId,int recipientId);

        Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams);
        
        Task<Painting> GetPaintingById(string id);
    }
}