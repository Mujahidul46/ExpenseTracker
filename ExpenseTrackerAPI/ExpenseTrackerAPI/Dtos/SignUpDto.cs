using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Dtos
{
    public class SignUpDto
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")]
        public string Password { get; set; }

        // Not including DoB for now to simplify sign-up process
    }
}
