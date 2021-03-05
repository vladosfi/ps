using System;
using System.Collections.Generic;
    

    using Microsoft.AspNetCore.Identity;
namespace PS.API.Models
{
    public class Painting
    {
        public Painting()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Images = new HashSet<Image>();
            this.CreatedOn = DateTime.Now;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<Image> Images { get; set; }
    }
}