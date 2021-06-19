using System;
using Microsoft.AspNetCore.Http;

namespace PS.API.Dtos.Photo
{
    public class PhotoForCreationInputModel
    {
        public PhotoForCreationInputModel()
        {
            DateAdded = DateTime.UtcNow;
        }
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

    }
}