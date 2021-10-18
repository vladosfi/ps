using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Dtos.Contact
{
        public class ContactFormEntry : BaseModel<int>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string Ip { get; set; }
    }
}