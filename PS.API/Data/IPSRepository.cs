using System.Collections.Generic;
using System.Threading.Tasks;
using PS.API.Dtos;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Data
{
    public interface IPSRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        void ClearChangeTracker();

        Task<User> GetUser(int id);

        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Image> GetMainImageForPainting(string paintingId);

        Task<Like> GetLike(int userId, int recipientId);

        Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams);

        Task<Image> GetImage(string id);

        Task<Painting> GetPaintingById(string id);

        Task<ICollection<Painting>> GetPaintingByIds(ICollection<string> paintingIds);
        
        Task<int> GetLastPaintingPosition();

        Task<Painting> GetPaintingByIdOrdered(string id);

        Task<Painting> AddPainting(Painting painting);
    }
}