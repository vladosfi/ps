using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class PaintingConfig : IEntityTypeConfiguration<Painting>
    {
        private const int maxNameLength = 30;
        private const int maxDescLength = 5000;

        public void Configure(EntityTypeBuilder<Painting> builder)
        {

            builder
                .HasMany(p => p.Images)
                .WithOne(i => i.Painting)
                .HasForeignKey(i => i.PaintingId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(u => u.Name)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.Description)
                .HasMaxLength(maxDescLength)
                .IsRequired();

            builder.Property(u => u.NameGb)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.DescriptionGb)
                .HasMaxLength(maxDescLength)
                .IsRequired();

            builder.Property(u => u.NameDe)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.DescriptionDe)
                .HasMaxLength(maxDescLength)
                .IsRequired();

            builder.Property(u => u.NameRu)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.DescriptionRu)
                .HasMaxLength(maxDescLength)
                .IsRequired();
        }
    }
}
