using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Painting : BaseModel<string>
    {
        private const int minNameLength = 2;
        private const int maxNameLength = 30;
        private const int minDeskLength = 10;
        private const int maxDeskLength = 500;

        public Painting()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Images = new HashSet<Image>();
            this.CreatedOn = DateTime.UtcNow;
        }

        [Range(1, int.MaxValue)]
        public int Position { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string Name { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string Description { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameGb { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string DescriptionGb { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameDe { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string DescriptionDe { get; set; }

        [Required]
        [MinLength(minNameLength), MaxLength(maxNameLength)]
        public string NameRu { get; set; }

        [Required]
        [MinLength(minDeskLength), MaxLength(maxDeskLength)]
        public string DescriptionRu { get; set; }

        public bool Available { get; set; }

        public float SizeX { get; set; }

        public float SizeY { get; set; }

        public long ViewCount { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<Image> Images { get; set; }
    }
}