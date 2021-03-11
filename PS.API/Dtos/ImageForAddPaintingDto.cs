using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos
{
    public class ImageForAddPaintingDto
    {

        public ImageForAddPaintingDto()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string Name { get; set; }

        [Required]
        public IFormFile File { get; set; }

        public string ImageUrl { get; set; }
    }
}