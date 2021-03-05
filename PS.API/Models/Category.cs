using System.Collections.Generic;

namespace PS.API.Models
{
    public class Category
    {
        public Category()
        {
            this.Paintings = new HashSet<Painting>();
        }
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Painting> Paintings { get; set; }
    }
}