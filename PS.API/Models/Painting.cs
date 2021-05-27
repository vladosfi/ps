using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Painting: BaseModel<string>
    {
        public Painting()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Images = new HashSet<Image>();
            this.CreatedOn = DateTime.Now;
        }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public bool Available { get; set; }

        public float SizeX { get; set; }

        public float SizeY { get; set; }
        
        public long ViewCount { get; set; }

        public Category Category { get; set; }
        
        [Required]
        public int CategoryId { get; set; }

        public ICollection<Image> Images { get; set; }
    }
}