using System;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Image : BaseModel<string>
    {
        private const int minNameLength = 2;
        private const int maxNameLength = 100;
        private const int maxURLength = 2048;
        private const int minURLength = 10;

        public Image()
        {
            this.CreatedOn = DateTime.UtcNow;
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Name { get; set; }

        [Required]
        [MinLength(minURLength), MaxLength(maxURLength)]
        public string Url { get; set; }
        public string ImageFileName { get; set; }
        public bool IsMain { get; set; }
        public Painting Painting { get; set; }
        public string PaintingId { get; set; }
    }
}