namespace ExpenseTrackerAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public List<Expense> Expenses { get; set; }
        public bool IsAdmin { get; set; }
    }
}