using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos.Painting
{
    public class PaintingImageForCreateInputModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}