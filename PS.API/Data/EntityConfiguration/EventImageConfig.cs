using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class EventImageConfig : IEntityTypeConfiguration<EventImage>
    {
        private const int maxNameLength = 100;
        private const int maxURLength = 2048;
        
        public void Configure(EntityTypeBuilder<EventImage> builder)
        {
            builder.Property(е => е.Name)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(е => е.Name)
                .HasMaxLength(maxURLength)
                .IsRequired();
        }
    }
}