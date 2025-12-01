using ExpenseTrackerAPI;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public ActionResult<List<Expense>> GetExpenses()
        {
            var expenses = _dbContext.Expenses.ToList();
            return Ok(expenses);
        }

        // Get by id
        [HttpGet("{id}")]
        public ActionResult<Expense> GetExpenseById(int id)
        {
            var expense = _dbContext.Expenses.Find(id);
            if (expense == null)
            {
                return NotFound();
            }
            return expense;
        }

        // Create
        [HttpPost]
        public ActionResult<Expense> CreateExpense(Expense expense)
        {
            var newExpense = new Expense
            {
                Name = expense.Name,
                Amount = expense.Amount
            };

            _dbContext.Expenses.Add(newExpense);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetExpenseById), // Tells ASP.NET to use the GetExpenseById method to generate the URL
                new { id = newExpense.Id }, // Supplies the new expense's Id to GetExpenseById method
                newExpense); // The newly created expense object's data so we can see it in the response body
        }


        // Update
        [HttpPut("{id}")]
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


        // Delete
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
            return Ok(expense);
        }
    }
}
