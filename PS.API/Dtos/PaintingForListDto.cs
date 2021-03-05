using System;

namespace PS.API.Dtos
{
    public class PaintingForListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string MainImageUrl { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}