namespace ExpenseTrackerAPI.Dtos
{
    public class HuggingFaceResponseDto
    {
        public string label { get; set; } = string.Empty;
        public double score { get; set; }
    }
}
