namespace PS.API.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SrcPath { get; set; }
        public bool IsMain { get; set; }
        public Painting Painting { get; set; }
        public int PaintingId { get; set; }
    }
}