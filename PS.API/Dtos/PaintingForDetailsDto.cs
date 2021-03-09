using System;

namespace PS.API.Dtos
{
    public class PaintingForDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public bool Available { get; set; }
        public float SizeX { get; set; }
        public float SizeY { get; set; }
        public string ImageUrl { get; set; }
    }
}