using System.Linq;
using System.Threading.Tasks;

namespace PS.API.Data.Common.Interfaces
{
    public interface IDeletableEntityRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IDeletableEntity
    {
        IQueryable<TEntity> AllWithDeleted();

        IQueryable<TEntity> AllAsNoTrackingWithDeleted();

        Task<TEntity> GetByIdWithDeletedAsync(params object[] id);

        IQueryable<TEntity> FullTextSearch(string propertyReference, string freeText);

        void HardDelete(TEntity entity);

        void Undelete(TEntity entity);
    }
}