using AutoMapper;
using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Need to add repository design pattern
// Need to add DTOs

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ExpensesController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetExpenses()
    {
        var expenses = _context.Expenses.ToList();
        var expenseDtos = _mapper.Map<List<ExpenseDto>>(expenses);
        return Ok(expenseDtos);
    }

    [HttpGet("{id}")]
    public IActionResult GetExpenseById(int id)
    {
        var expense = _context.Expenses.Find(id);
        if (expense == null)
        {
            return NotFound();
        }
        var expenseDto = _mapper.Map<ExpenseDto>(expense);
        return Ok(expenseDto);
    }

    [HttpPost]
    public IActionResult AddExpense([FromBody] ExpenseDto expenseDto)
    {
        if (expenseDto == null)
        {
            return BadRequest("Expense data is required.");
        }

        expenseDto.Id = 0;
        var expense = _mapper.Map<Expense>(expenseDto);
        _context.Expenses.Add(expense);
        _context.SaveChanges();

        var createdExpenseDto = _mapper.Map<ExpenseDto>(expense);

        return CreatedAtAction(nameof(GetExpenseById), new { id = expense.Id }, createdExpenseDto); // returns the URL of the newly created expense - e.g. /api/Expenses/13
    }

    [HttpPut]
    public IActionResult UpdateExpenseWithId(int id, [FromBody] Expense expense)
    {
        // Update the existing expense
        var expenseToUpdate = _context.Expenses.Find(id);

        if (expenseToUpdate == null)
        {
            return NotFound(); // Expense with the given ID doesn't exist
        }

        expenseToUpdate.Description = expense.Description;
        expenseToUpdate.Amount = expense.Amount;
        expenseToUpdate.Date = expense.Date;
        expenseToUpdate.Category = expense.Category;

        _context.SaveChanges(); // Commit the update to the database

        return Ok(expenseToUpdate);
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
