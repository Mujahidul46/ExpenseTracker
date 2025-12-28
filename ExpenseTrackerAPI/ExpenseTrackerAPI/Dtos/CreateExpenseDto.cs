using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Dtos
{
    public class CreateExpenseDto
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 1, ErrorMessage = "Expense name must be between 1 and 100 characters.")]
        public string Name { get; set; }

        [Range(typeof(decimal), minimum: "0.00", maximum: "10000000000", ErrorMessage = "Amount cannot be negative.")] // No negative amounts, or greater than 10 billion
        public decimal? Amount { get; set; } // Amount does not have [Required] attribute as user may not know amount yet

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}