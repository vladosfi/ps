using System;
using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class UserForRegisterDto
    {
        public UserForRegisterDto()
        {
            this.Created = DateTime.UtcNow;
            this.LastActive = DateTime.UtcNow;
        }
        
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 8 characters")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }
    }
}