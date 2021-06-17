using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PS.API.Models;

namespace PS.API.Data.EntityConfiguration
{
    public class EventConfig : IEntityTypeConfiguration<Event>
    {
        private const int maxNameLength = 30;
        private const int maxTextLength = 5000;

        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder
                .HasMany(e => e.Images)
                .WithOne(i => i.Event)
                .HasForeignKey(i => i.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(е => е.Name)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(е => е.Text)
                .HasMaxLength(maxTextLength)
                .IsRequired();

            builder.Property(е => е.NameGb)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(е => е.TextGb)
                .HasMaxLength(maxTextLength)
                .IsRequired();

            builder.Property(е => е.NameDe)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(е => е.TextDe)
                .HasMaxLength(maxTextLength)
                .IsRequired();

            builder.Property(е => е.NameRu)
                .HasMaxLength(maxNameLength)
                .IsRequired();

            builder.Property(е => е.TextRu)
                .HasMaxLength(maxTextLength)
                .IsRequired();

            builder.Property(е => е.Author)
                .HasMaxLength(maxTextLength)
                .IsRequired();
        }
    }
}