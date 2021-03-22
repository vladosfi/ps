using System;

namespace PS.API.Dtos
{
    public class EventDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}