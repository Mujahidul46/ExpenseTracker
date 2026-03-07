namespace ExpenseTrackerAPI.Dtos
{
    public class HuggingFaceResponseDto
    {
        public string[] labels { get; set; } = Array.Empty<string>();
        public double[] scores { get; set; } = Array.Empty<double>();
    }
}
