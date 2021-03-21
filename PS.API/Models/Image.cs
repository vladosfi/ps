using System;
using PS.API.Data.Common.Base;

namespace PS.API.Models
{
    public class Image: BaseModel<string>
    {
        public Image()
        {
            this.CreatedOn = DateTime.Now;    
            this.Id = Guid.NewGuid().ToString();
        }

        public string Name { get; set; }
        public string Url { get; set; }
        public string ImageFileName { get; set; }
        public bool IsMain { get; set; }
        public Painting Painting { get; set; }
        public string PaintingId { get; set; }
    }
}