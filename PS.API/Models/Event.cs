using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Event : BaseModel<int>
    {
        private const int minNameLength = 2;
        private const int maxNameLength = 30;
        private const int minTextLength = 300;
        private const int maxTextLength = 5000;

        public Event()
        {
            this.CreatedOn = DateTime.UtcNow;
            this.Images = new HashSet<EventImage>();
        }

        public DateTime EventDate { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Name { get; set; }

        [Required]
        [MinLength(minTextLength), MaxLength(maxTextLength)]
        public string Text { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameGb { get; set; }

        [Required]
        [MinLength(minTextLength), MaxLength(maxTextLength)]
        public string TextGb { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameDe { get; set; }

        [Required]
        [MinLength(minTextLength), MaxLength(maxTextLength)]
        public string TextDe { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameRu { get; set; }

        [Required]
        [MinLength(minTextLength), MaxLength(maxTextLength)]
        public string TextRu { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Author { get; set; }

        public long ViewCount { get; set; }

        public ICollection<EventImage> Images { get; set; }
    }
}