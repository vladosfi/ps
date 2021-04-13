using System.ComponentModel.DataAnnotations;

namespace PS.API.Models
{
    public class EventImage
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string ImageFileName { get; set; }

        [Required]
        public bool IsMain { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
    }

}