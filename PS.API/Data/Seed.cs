using System.Collections.Generic;
using System.Linq;
using PS.API.Models;
using Newtonsoft.Json;

namespace PS.API.Data
{
    public class Seed
    {
        public static void MakeSeed(DataContext context)
        {
            SeedUsers(context);
            SeedPaintingCategories(context);
        }

        private static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }

                context.SaveChanges();
            }
        }
        private static void SeedPaintingCategories(DataContext context)
        {
            if (!context.Categories.Any())
            {
                var categoriesData = System.IO.File.ReadAllText("Data/CategorySeedData.json");
                var paintingsData = System.IO.File.ReadAllText("Data/PaintingSeedData.json");
                var categories = JsonConvert.DeserializeObject<List<Category>>(categoriesData);
                var paintings = JsonConvert.DeserializeObject<List<Painting>>(paintingsData);
                var position = 0;

                foreach (var category in categories)
                {
                    context.Categories.Add(category);

                    foreach(var painting in paintings.Where(p => p.CategoryId == category.Id)){
                        painting.Position = ++position;
                        context.Paintings.Add(painting);
                    }
                }

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}