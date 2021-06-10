using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos
{
    public class PaintingForUpdatePaintingPositionDto
    {
        [Required]
        public string Id { get; set; }
        
        [Required]
        public int Position { get; set; }
    }
}