using ExpenseTrackerAPI.Data;
using Microsoft.AspNetCore.Mvc;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Dtos;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : ControllerBase
    {
        public readonly ExpenseTrackerContext _dbContext;
        private readonly IMapper _mapper;


        public ExpensesController(ExpenseTrackerContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet("users/{userId}")]
        public ActionResult<List<ExpenseDto>> GetExpenses(int userId)
        {
            // add validation for userId
            var expenses = _dbContext.Expenses
                .Include(expenses => expenses.Category) // if not included, the join doesnt happen and Category is null.
                .Where(expenses => expenses.UserId == userId)
                .ToList();

            var expenseDtos = _mapper.Map<List<ExpenseDto>>(expenses);

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
            var expenseDto = _mapper.Map<ExpenseDto>(expense);
            return expenseDto;
        }

        [HttpPost]
        public ActionResult<ExpenseDto> CreateExpense(CreateExpenseDto expense)
        {
            var newExpense = new Expense
            {
                Name = expense.Name,
                Amount = expense.Amount ?? 0m,
                CategoryId = expense.CategoryId,
                UserId = expense.UserId
            };
            
            _dbContext.Expenses.Add(newExpense);
            _dbContext.SaveChanges();

            var expenseDto = _mapper.Map<ExpenseDto>(newExpense);

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


        [HttpDelete("{id}")]
        public ActionResult DeleteExpense(int id)
        {
            var expense = _dbContext.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound(); 
            }
            _dbContext.Expenses.Remove(expense);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}
