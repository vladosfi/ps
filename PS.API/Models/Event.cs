using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Event: BaseModel<int>
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

        public ICollection<EventImage> Images { get; set; }
    }
}