namespace ExpenseTrackerAPI.Dtos
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryIcon { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}