namespace PS.API.Helpers
{
    public class PaintingParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int CategoryId { get; set; }
        public bool? Available { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Language { get; set; }
    }
}