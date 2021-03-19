using System.ComponentModel.DataAnnotations;

namespace PS.API.Models
{
    public class Events
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Text { get; set; }
    }
}