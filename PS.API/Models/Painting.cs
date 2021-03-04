using System.Collections.Generic;

namespace PS.API.Models
{
    public class Painting
    {
        public Painting()
        {
            this.Images = new HashSet<Image>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<Image> Images { get; set; }
    }
}