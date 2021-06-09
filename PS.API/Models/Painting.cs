using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Painting : BaseModel<string>
    {
        public Painting()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Images = new HashSet<Image>();
            this.CreatedOn = DateTime.UtcNow;
        }

        [Required]
        public int Position { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string NameGb { get; set; }

        [Required]
        [StringLength(500)]
        public string DescriptionGb { get; set; }

        [Required]
        [StringLength(50)]
        public string NameDe { get; set; }

        [Required]
        [StringLength(500)]
        public string DescriptionDe { get; set; }

        [Required]
        [StringLength(50)]
        public string NameRu { get; set; }

        [Required]
        [StringLength(500)]
        public string DescriptionRu { get; set; }

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