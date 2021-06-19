using System;

namespace PS.API.Dtos.Event
{
    public class EventsForListViewModel
    {        
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }        
        public string Author { get; set; }
        public string MainImageUrl { get; set; }       
        public string ImageFileName { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}