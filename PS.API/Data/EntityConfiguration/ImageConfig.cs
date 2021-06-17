using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class ImageConfig : IEntityTypeConfiguration<Image>
    {
        private const int maxNameLength = 100;
        private const int maxURLength = 2048;

        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.Property(u => u.Name)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.Name)
                .HasMaxLength(maxURLength)
                .IsRequired();
        }
    }
}
