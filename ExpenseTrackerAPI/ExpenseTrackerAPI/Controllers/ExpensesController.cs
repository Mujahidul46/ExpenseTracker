using ExpenseTrackerAPI.Data;
using Microsoft.AspNetCore.Mvc;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : ControllerBase
    {
        public readonly ExpenseTrackerContext _dbContext;
        public ExpensesController(ExpenseTrackerContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("users/{userId}")]
        public ActionResult<List<ExpenseDto>> GetExpenses(int userId)
        {
            // add validation for userId
            var expenses = _dbContext.Expenses
                .Include(expenses => expenses.Category) // if not included, the join doesnt happen and Category is null.
                .Where(expenses => expenses.UserId == userId)
                .ToList();
            //var expenseDtos = new List<ExpenseDto>();
            //foreach(var expense in expenses)
            //{
            //    var expenseDto = new ExpenseDto
            //    {
            //        Id = expense.Id,
            //        Name = expense.Name,
            //        CategoryId = expense.CategoryId,
            //        Amount = expense.Amount,
            //        UserId = expense.UserId
            //    };
            //    expenseDtos.Add(expenseDto);
            //}

            var expenseDtos = expenses.Select(expense => new ExpenseDto
            {
                Id = expense.Id,
                Name = expense.Name,
                Amount = expense.Amount,
                CategoryId = expense.CategoryId,
                UserId = expense.UserId,
                CategoryName = expense.Category.Name
            }).ToList();

            return Ok(expenseDtos);
        }

        [HttpGet("{id}")]
        public ActionResult<ExpenseDto> GetExpenseById(int id)
        {
            var expense = _dbContext.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }
            var expenseDto = new ExpenseDto
            {
                Id = expense.Id,
                Name = expense.Name,
                Amount = expense.Amount
            };
            return expenseDto;
        }

        [HttpPost]
        public ActionResult<ExpenseDto> CreateExpense(CreateExpenseDto expense)
        {
            var newExpense = new Expense
            {
                Name = expense.Name,
                Amount = expense.Amount ?? 0m
            };
            
            _dbContext.Expenses.Add(newExpense);
            _dbContext.SaveChanges();

            var expenseDto = new ExpenseDto
            {
                Id = newExpense.Id,
                Name = newExpense.Name,
                Amount = newExpense.Amount
            };

            return CreatedAtAction(nameof(GetExpenseById), // Tells ASP.NET to use the GetExpenseById method to generate the URL
                new { id = expenseDto.Id }, // Supplies the new expense's Id to GetExpenseById method
                expenseDto); // The newly created expense object's data so we can see it in the response body
        }

        [HttpPut("{id}")] // need to update to use dto
        public ActionResult<Expense> UpdateExpense(int id, Expense newExpenseDetails)
        {
            var expense = _dbContext.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }
            expense.Name = newExpenseDetails.Name;
            expense.Amount = newExpenseDetails.Amount;

            _dbContext.SaveChanges();

            return Ok(expense);
        }


        [HttpDelete("{id}")] // need to update to use dto
        public ActionResult DeleteExpense(int id)
        {
            var expense = _dbContext.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }
            _dbContext.Expenses.Remove(expense);
            _dbContext.SaveChanges();
            return Ok(expense);
        }
    }
}
