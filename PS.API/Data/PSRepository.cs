using System.Threading.Tasks;
using PS.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using PS.API.Helpers;
using System;
using PS.API.Dtos;

namespace PS.API.Data
{
    public class PSRepository : IPSRepository
    {
        private const string orderByCreated = "created";
        private const int userMaxAge = 99;
        private const int userMinAge = 1;


        private readonly DataContext context;

        public PSRepository(DataContext context)
        {
            this.context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            this.context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await this.context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await this.context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await this.context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Image> GetImage(string id)
        {
            var image = await this.context.Images.FirstOrDefaultAsync(i => i.Id == id);

            return image;
        }

        public async Task<Image> GetMainImageForPainting(string paintingId)
        {
            return await this.context.Images.Where(i => i.PaintingId == paintingId).FirstOrDefaultAsync(i => i.IsMain == true);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await this.context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams)
        {
            var paintings = this.context.Paintings.Include(p => p.Images).OrderByDescending(p => p.Position)
            .ThenByDescending(p => p.CreatedOn).AsQueryable();

            if (paintingParams.CategoryId != 0)
            {
                paintings = paintings.Where(p => p.CategoryId == paintingParams.CategoryId);
            }

            if (paintingParams.Available != null)
            {
                paintings = paintings.Where(p => p.Available == paintingParams.Available);
            }


            var currentLanguage = paintingParams?.Language.ToLower();

            paintings = paintings.Select(p => new Painting
            {
                Id = p.Id,
                Available = p.Available,
                CreatedOn = p.CreatedOn,
                Images = p.Images,
                CategoryId = p.CategoryId,
                Name =
                    currentLanguage == "bg" ? p.Name :
                    currentLanguage == "de" ? p.NameDe :
                    currentLanguage == "ru" ? p.NameRu : p.NameGb,
                Description =
                    currentLanguage == "bg" ? p.Description :
                    currentLanguage == "de" ? p.DescriptionDe :
                    currentLanguage == "ru" ? p.DescriptionRu : p.DescriptionGb,
                SizeX = p.SizeX,
                SizeY = p.SizeY,
                ViewCount = p.ViewCount,
                Position = p.Position
            });

            if (paintingParams.Name != string.Empty)
            {
                paintings = paintings.Where(p => EF.Functions.Like(p.Name, $"%{paintingParams.Name}%"));
            }

            return await PagedList<Painting>.CreateAsync(paintings, paintingParams.PageNumber, paintingParams.PageSize);
        }


        public async Task<Painting> GetPaintingById(string id, PaintingParams paintingParams)
        {
            //var painting = await this.context.Paintings.Include(p => p.Images.OrderByDescending(i => i.IsMain)).Include(c => c.Category).FirstOrDefaultAsync(p => p.Id == id);
            var painting = this.context.Paintings.Include(p => p.Images).Include(c => c.Category).AsQueryable();

            var currentLanguage = paintingParams?.Language.ToLower();

            painting = painting.Select(p => new Painting
            {
                Id = p.Id,
                Available = p.Available,
                CreatedOn = p.CreatedOn,
                Images = p.Images,
                CategoryId = p.CategoryId,
                Name =
                    currentLanguage == "bg" ? p.Name :
                    currentLanguage == "de" ? p.NameDe :
                    currentLanguage == "ru" ? p.NameRu : p.NameGb,
                Description =
                    currentLanguage == "bg" ? p.Description :
                    currentLanguage == "de" ? p.DescriptionDe :
                    currentLanguage == "ru" ? p.DescriptionRu : p.DescriptionGb,
                SizeX = p.SizeX,
                SizeY = p.SizeY,
                ViewCount = p.ViewCount,
                Position = p.Position
            });

            return await painting.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Painting> GetPaintingByIdForEdit(string id)
        {
            var painting = await this.context.Paintings.Include(p => p.Images.OrderByDescending(i => i.IsMain)).Include(c => c.Category).FirstOrDefaultAsync(p => p.Id == id);

            return painting;
        }


        public async Task IncreasePaintingViews(string id)
        {
            var paintingEntity = await this.context.Paintings.FirstOrDefaultAsync(e => e.Id == id);
            ++paintingEntity.ViewCount;
            await SaveAll();
        }

        public async Task<Painting> AddPainting(Painting painting)
        {
            await this.context.Paintings.AddAsync(painting);

            if (await this.SaveAll())
            {
                return painting;
            }

            return null;
        }

        public async Task<int> GetLastPaintingPosition()
        {
            var lastPainting = await this.context.Paintings.OrderByDescending(p => p.Position).FirstOrDefaultAsync();

            if (lastPainting != null)
            {
                return lastPainting.Position;
            }

            return 0;
        }


        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = this.context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }
            else if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }
            else
            {
                users = users.Where(u => u.Id != userParams.UserId);
                users = users.Where(u => u.Gender == userParams.Gender);
            }



            if (userParams.MinAge != userMinAge || userParams.MaxAge != userMaxAge)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case orderByCreated:
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> UpdatePaintingPositionById(ICollection<PaintingForUpdatePaintingPositionDto> paintings)
        {
            var paintingsForUpdate = await this.context.Paintings.Where(p => paintings.Select(i => i.Id).FirstOrDefault() == p.Id).ToListAsync();

            //paintingsForUpdate.Select(p => p.Position = paintings.Where(i => i.Id == p.Id).Select(i => i.Position).FirstOrDefault());

            foreach (var painting in paintingsForUpdate)
            {
                var newPainting = paintings.Where(p => p.Id == painting.Id).FirstOrDefault();
                //painting.Position = newPainting.Position;
                //painting.Position = paintings.Where(p => p.Id == painting.Id).Select(p => p.Position).FirstOrDefault();
                //System.Console.WriteLine(painting.Id + ": " + painting.Position);
                System.Console.WriteLine( newPainting.Id + ": " + newPainting.Position);
            }

            return await this.SaveAll();
        }

        public async Task<bool> SaveAll()
        {
            return await this.context.SaveChangesAsync() > 0;
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await this.context.Users.Include(x => x.Likers).Include(x => x.Likees).AsSplitQuery().FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }
    }
}