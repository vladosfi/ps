using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Event : BaseModel<int>
    {
        public Event()
        {
            this.CreatedOn = DateTime.UtcNow;
            this.Images = new HashSet<EventImage>();
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public string NameGb { get; set; }

        [Required]
        public string DescriptionGb { get; set; }

        [Required]
        public string NameDe { get; set; }

        [Required]
        public string DescriptionDe { get; set; }

        [Required]
        public string NameRu { get; set; }

        [Required]
        public string DescriptionRu { get; set; }

        public string Author { get; set; }

        public long ViewCount { get; set; }

        public ICollection<EventImage> Images { get; set; }
    }
}