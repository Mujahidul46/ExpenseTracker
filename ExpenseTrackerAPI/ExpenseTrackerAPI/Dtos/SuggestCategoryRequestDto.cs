namespace ExpenseTrackerAPI.Dtos
{
    public class SuggestCategoryRequestDto
    {
        public string ExpenseName { get; set; }
        public List<string> Categories { get; set; }
    }
}
