using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly DataContext _context;

    public ExpensesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetExpenses()
    {
        var expenses = _context.Expenses.ToList();
        return Ok(expenses);
    }

    [HttpGet("{id}")]
    public IActionResult GetExpenseById(int id)
    {
        var expense = _context.Expenses.Find(id);
        if (expense == null)
        {
            return NotFound();
        }
        return Ok(expense);
    }

    [HttpPost]
    public IActionResult AddExpense([FromBody] Expense expense)
    {
        if (expense == null)
        {
            return BadRequest("Expense data is required.");
        }

        expense.ExpenseID = 0; // EF Core will ignore this and let SQL Server generate the ID

        _context.Expenses.Add(expense);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetExpenseById), new { id = expense.ExpenseID }, expense); // returns the URL of the newly created expense - e.g. /api/Expenses/13
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteExpense(int id)
    {
        var expense = _context.Expenses.Find(id);

        if (expense == null)
        {
            return NotFound(); // Expense with the given ID doesn't exist
        }

        _context.Expenses.Remove(expense);
        _context.SaveChanges(); // Commit the deletion to the database

        return NoContent(); // 204 No Content (successful delete)
    }


}
