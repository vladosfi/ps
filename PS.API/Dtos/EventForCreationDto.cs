using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class EventForCreationDto
    {
        [Required]
        [StringLength(60, MinimumLength = 5, ErrorMessage = "Event name must be between 5 and 60 characters")]
        public string Name { get; set; }
        [Required]
        [StringLength(3000, MinimumLength = 50, ErrorMessage = "Event text must be between 50 and 3000 characters")]
        public string Text { get; set; }
    }
}