namespace ExpenseTrackerAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}