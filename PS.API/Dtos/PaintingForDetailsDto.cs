using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class PaintingForDetailsDto
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string Category { get; set; }

        [Required]
        public bool Available { get; set; }

        public float SizeX { get; set; }

        public float SizeY { get; set; }

        public string ImageUrl { get; set; }
    }
}