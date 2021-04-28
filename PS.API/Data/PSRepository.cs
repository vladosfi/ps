using System.Threading.Tasks;
using PS.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using PS.API.Helpers;
using System;

namespace PS.API.Data
{
    public class PSRepository : IPSRepository
    {
        private const string orderByCreated = "created";
        private const int userMaxAge = 99;
        private const int userMinAge = 1;

        private const int latestEvents = 3;

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

        public async Task<EventImage> GetEventImage(string imageId)
        {
            var image = await this.context.EventImages.FirstOrDefaultAsync(i => i.Id == imageId);

            return image;
        }

        public async Task<Image> GetMainImageForPainting(string paintingId)
        {
            return await this.context.Images.Where(i => i.PaintingId == paintingId).FirstOrDefaultAsync(i => i.IsMain == true);
        }

        public async Task<EventImage> GetMainImageForEvent(int eventId)
        {
            return await this.context.EventImages.Where(e => e.EventId == eventId).FirstOrDefaultAsync(i => i.IsMain == true);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await this.context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
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

        public async Task<PagedList<Painting>> GetPapintings(PaintingParams paintingParams)
        {
            var paintings = this.context.Paintings.Include(p => p.Images).OrderByDescending(p => p.CreatedOn).AsQueryable();

            if (paintingParams.CategoryId != 0)
            {
                paintings = paintings.Where(p => p.CategoryId == paintingParams.CategoryId);
            }

            if (paintingParams.Available != null)
            {
                paintings = paintings.Where(p => p.Available == paintingParams.Available);
            }
            return await PagedList<Painting>.CreateAsync(paintings, paintingParams.PageNumber, paintingParams.PageSize);
        }

        public async Task<Event> GetEventById(int id)
        {
            var eventEntity = await this.context.Events.Include(p => p.Images).FirstOrDefaultAsync(e => e.Id == id);
            return eventEntity;
        }

        public async Task<Painting> GetPaintingById(string id)
        {
            var painting = await this.context.Paintings.Include(p => p.Images).Include(c => c.Category).FirstOrDefaultAsync(p => p.Id == id);

            return painting;
        }

        public async Task<Event> AddEvent(Event eventEntity)
        {
            await this.context.Events.AddAsync(eventEntity);
            
            if (await this.SaveAll())
            {
                return eventEntity;
            }

            return null;
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