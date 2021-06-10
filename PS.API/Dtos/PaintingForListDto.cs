using System;

namespace PS.API.Dtos
{
    public class PaintingForListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string ImageFileName { get; set; }
        public bool Available { get; set; }
        public long ViewCount { get; set; }
        public int Position { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}