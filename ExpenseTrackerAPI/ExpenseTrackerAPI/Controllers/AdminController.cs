using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("[controller]")]
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
        public ActionResult<List<UserExpenseDto>> GetAllExpenses() // returns all user's expenses 
        {
            var expenses = _dbContext.Expenses
                .Include(allExpenses => allExpenses.Category)
                .Include(allExpenses => allExpenses.User)
                .ToList();

            var expenseDtos = new List<UserExpenseDto>();

            foreach (var expense in expenses)
            {
                var expenseWithUserDto = new UserExpenseDto
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Amount = expense.Amount,
                    CategoryId = expense.CategoryId,
                    UserId = expense.UserId,
                    CategoryName = expense.Category.Name,
                    CategoryIcon = expense.Category.Icon,
                    Username = expense.User.Username,
                    Email = expense.User.Email
                };
                expenseDtos.Add(expenseWithUserDto);
            }

            return Ok(expenseDtos);
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var userDtos = await _dbContext.Users.Select(user => new UserDto
            {
                Id = user.Id,
                Name = user.Username,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth,
                IsAdmin = user.IsAdmin
            }).ToListAsync();

            return Ok(userDtos);
        }
    }
}
