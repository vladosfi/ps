using System;

namespace PS.API.Dtos
{
    public class EventsLatestDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string MainImage { get; set; }
        public string ImageFileName { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}