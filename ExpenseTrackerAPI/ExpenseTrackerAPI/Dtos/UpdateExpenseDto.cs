namespace ExpenseTrackerAPI.Dtos {
    public class UpdateExpenseDto // No validation attributes as all fields are optional
    {
        public string? Name { get; set; }
        public decimal? Amount { get; set; }
        public int? CategoryId { get; set; }
    }
}