using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class CategoryConfig : IEntityTypeConfiguration<Category>
    {
        private const int maxNameLength = 30;
        private const int maxDescLength = 100;

        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder
               .HasMany(c => c.Paintings)
               .WithOne(p => p.Category)
               .HasForeignKey(p => p.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

            builder.Property(u => u.Name)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(u => u.Description)
                .HasMaxLength(maxDescLength)
                .IsRequired();
        }
    }
}
