using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class PhotoConfig : IEntityTypeConfiguration<Photo>
    {
        private const int maxURLength = 2048;
        private const int maxDeskLength = 500;

        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.Property(p => p.Url)
                .HasMaxLength(maxURLength)
                .IsRequired();

            builder.Property(p => p.Description)
                .HasMaxLength(maxDeskLength)
                .IsRequired();
        }
    }
}