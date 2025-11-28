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
        public IEnumerable<Expense> GetExpenses()
        {
            return _dbContext.Expenses.ToList();
        }
    }
}
