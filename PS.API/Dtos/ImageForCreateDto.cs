using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos
{
    public class ImageForCreateDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}