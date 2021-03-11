using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos
{
    public class PaintingForAddPaintingDto
    {

        public PaintingForAddPaintingDto()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public bool Available { get; set; }

        [Required]
        public float SizeX { get; set; }

        [Required]
        public float SizeY { get; set; }

        public string MainImageUrl { get; set; }
    }
}