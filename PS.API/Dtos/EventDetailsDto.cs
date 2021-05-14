using System;
using PS.API.Models;

namespace PS.API.Dtos
{
    public class EventDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string[] ImagesUrl { get; set; } 
        public string MainImageUrl { get; set; } 
        public string Author { get; set; } 
        public DateTime CreatedOn { get; set; }
    }
}