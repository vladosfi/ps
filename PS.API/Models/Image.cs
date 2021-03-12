using System;

namespace PS.API.Models
{
    public class Image
    {
        public Image()
        {
            this.CreatedOn = DateTime.Now;    
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public DateTime CreatedOn { get; set; }
        public Painting Painting { get; set; }
        public string PaintingId { get; set; }
    }
}