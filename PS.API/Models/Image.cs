using System;

namespace PS.API.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string SrcPath { get; set; }
        public bool IsMain { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public Painting Painting { get; set; }
        public string PaintingId { get; set; }
    }
}