using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        private const int maxNameLength = 30;
        private const int maxGenderLength = 30;
        private const int maxTextLength = 500;
        private const int maxCityAndTownLength = 50;
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.Property(u => u.Username)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(g => g.Gender)
                .HasMaxLength(maxGenderLength)
                .IsRequired();

            builder.Property(k => k.KnownAs)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(k => k.Introduction)
                .HasMaxLength(maxTextLength)
                .IsRequired();

            builder.Property(k => k.Interests)
                .HasMaxLength(maxTextLength);

            builder.Property(k => k.City)
                .HasMaxLength(maxCityAndTownLength);

            builder.Property(k => k.Country)
                .HasMaxLength(maxCityAndTownLength);

            //ShadowProperties
            // builder.Entity<User>()
            //     .Property<DateTime?>("CreatedOn");
            // builder.Entity<User>()
            //     .Property<DateTime?>("UpdatedOn");
        }
    }
}