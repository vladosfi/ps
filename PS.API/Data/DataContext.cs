using System;
using Microsoft.EntityFrameworkCore;
using PS.API.Data.EntityConfiguration;
using PS.API.Dtos.Contact;
using PS.API.Models;

namespace PS.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventImage> EventImages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Painting> Paintings { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ContactFormEntry> ContactFormEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CategoryConfig());
            builder.ApplyConfiguration(new EventConfig());
            builder.ApplyConfiguration(new EventImageConfig());
            builder.ApplyConfiguration(new ImageConfig());
            builder.ApplyConfiguration(new LikeConfig());
            builder.ApplyConfiguration(new PaintingConfig());
            builder.ApplyConfiguration(new PhotoConfig());
            builder.ApplyConfiguration(new UserConfig());
        }
    }
}