namespace ExpenseTrackerAPI.Dtos
{
    public class AdminExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string CategoryName { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
