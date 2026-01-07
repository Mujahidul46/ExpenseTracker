namespace ExpenseTrackerAPI.Dtos
{
    public class UserExpenseDto : ExpenseDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
