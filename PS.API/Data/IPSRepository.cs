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
        Task<IEnumerable<User>> GetUsers();

        Task<Photo> GetPhoto(int id);

    }
}