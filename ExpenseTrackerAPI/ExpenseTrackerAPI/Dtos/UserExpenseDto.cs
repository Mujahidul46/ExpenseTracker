namespace ExpenseTrackerAPI.Dtos
{
    public class UserExpenseDto : ExpenseDto
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
