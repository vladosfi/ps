using System;
using System.Collections.Generic;

namespace PS.API.Dtos.Event
{
    public class EventDetailsDto
    {
        public EventDetailsDto()
        {
            this.Images = new HashSet<ImageForDetailedViewModel>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string NameGb { get; set; }
        public string TextGb { get; set; }
        public string NameDe { get; set; }
        public string TextDe { get; set; }
        public string NameRu { get; set; }
        public string TextRu { get; set; }
        public string MainImageUrl { get; set; } 
        public string Author { get; set; } 
        public DateTime CreatedOn { get; set; }
        public DateTime EventDate { get; set; }
        
        public ICollection<ImageForDetailedViewModel> Images { get; set; }
        //public ICollection<EventImageForDetailedDto> EventImage { get; set; }
    }
}