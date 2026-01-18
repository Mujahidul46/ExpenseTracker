namespace ExpenseTrackerAPI.Dtos {
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsAdmin { get; set; }
    }
}