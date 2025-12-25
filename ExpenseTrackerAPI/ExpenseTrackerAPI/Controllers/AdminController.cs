using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public readonly ExpenseTrackerContext _dbContext;

        public AdminController(ExpenseTrackerContext dbContext)
        {
            _dbContext = dbContext;
        }

        // implement pagination + filtering here later
        [HttpGet("all-expenses")]
        public ActionResult<List<AdminExpenseDto>> GetAllExpenses() // returns all user's expenses 
        {
            var allExpenses = _dbContext.Expenses
                .Include(allExpenses => allExpenses.Category)
                .Include(allExpenses => allExpenses.User)
                .ToList();

            var allExpenseDtos = new List<AdminExpenseDto>();

            foreach (var expense in allExpenses)
            {
                var adminExpenseDto = new AdminExpenseDto
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                    CategoryId = expense.CategoryId,
                    UserId = expense.UserId,
                    CategoryName = expense.Category.Name,
                    UserName = expense.User.Name,
                    UserEmail = expense.User.Email
                };
                allExpenseDtos.Add(adminExpenseDto);
            }

            return Ok(allExpenseDtos);
        }

        //[HttpGet()]
        //public IActionResult GetAllUsers() // return if theyre admin or not too
        //{

        //}
    }
}
