using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PS.API.Models
{
    public class Category
    {
        private const int minNameLength = 2;
        private const int maxNameLength = 30;
        private const int minDeskLength = 10;
        private const int maxDeskLength = 100;

        public Category()
        {
            this.Paintings = new HashSet<Painting>();
        }

        public int Id { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Name { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string Description { get; set; }

        public ICollection<Painting> Paintings { get; set; }
    }
}