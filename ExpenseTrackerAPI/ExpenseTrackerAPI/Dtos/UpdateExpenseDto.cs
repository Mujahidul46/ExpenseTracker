namespace ExpenseTrackerAPI.Dtos {
    public class UpdateExpenseDto
    {
        public string? Name { get; set; }
        public decimal? Amount { get; set; }
        public int? CategoryId { get; set; }
    }
}