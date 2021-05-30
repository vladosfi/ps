using System;
using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class PaintingForCreationDto
    {

        public PaintingForCreationDto()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string NameGb { get; set; }
        [Required]
        public string DescriptionGb { get; set; }
        [Required]
        public string NameDe { get; set; }
        [Required]
        public string DescriptionDe { get; set; }
        [Required]
        public string NameRu { get; set; }
        [Required]
        public string DescriptionRu { get; set; }

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