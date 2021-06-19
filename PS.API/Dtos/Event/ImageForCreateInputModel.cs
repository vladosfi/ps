using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos.Event
{
    public class ImageForCreateInputModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}