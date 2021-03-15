using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class PaintingForUpdateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public bool Available { get; set; }

        [Required]
        [Range(0, 500)]
        public float SizeX { get; set; }

        [Required]
        [Range(0, 500)]
        public float SizeY { get; set; }

        //public string MainImageUrl { get; set; }
    }
}