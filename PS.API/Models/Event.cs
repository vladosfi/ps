using System;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Event: BaseModel<int>
    {        
        public Event()
        {
            this.CreatedOn = DateTime.UtcNow;    
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Text { get; set; }
    }
}