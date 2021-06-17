using System;
using System.ComponentModel.DataAnnotations;

namespace PS.API.Models
{
    public class Photo
    {
        private const int maxURLength = 2048;
        private const int minURLength = 10;        
        private const int minDeskLength = 10;
        private const int maxDeskLength = 500;

        public int Id { get; set; }

        [Required]
        [MinLength(minURLength), MaxLength(maxURLength)]
        public string Url { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}