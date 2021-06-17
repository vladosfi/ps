using System;
using System.ComponentModel.DataAnnotations;

namespace PS.API.Models
{
    public class EventImage
    {
        private const int minNameLength = 2;
        private const int maxNameLength = 100;
        private const int maxURLength = 2048;
        private const int minURLength = 10;

        public EventImage()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Name { get; set; }

        [Required]
        [MinLength(minURLength), MaxLength(maxURLength)]
        public string Url { get; set; }

        [Required]
        public string ImageFileName { get; set; }

        public bool IsMain { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
    }

}