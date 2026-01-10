using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Dtos
{
    public class LogInDto
    {
        [Required]
        public string EmailOrUsername { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
