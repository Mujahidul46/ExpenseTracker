using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Dtos
{
    public class LogInDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
