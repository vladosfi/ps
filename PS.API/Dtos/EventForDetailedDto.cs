using System;
using System.Collections.Generic;

namespace PS.API.Dtos
{
    public class EventDetailsDto
    {
        public EventDetailsDto()
        {
            this.Images = new HashSet<EventImageForDetailedDto>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string MainImageUrl { get; set; } 
        public string Author { get; set; } 
        public DateTime CreatedOn { get; set; }
        
        public ICollection<EventImageForDetailedDto> Images { get; set; }
        //public ICollection<EventImageForDetailedDto> EventImage { get; set; }
    }
}