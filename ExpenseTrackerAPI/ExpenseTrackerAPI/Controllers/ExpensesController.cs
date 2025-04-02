using AutoMapper;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

// Add a Json repository to practice repository pattern

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IRepository<Expense> _repository;

    public ExpensesController(IMapper mapper, IRepository<Expense> repository)
    {
        _mapper = mapper;
        _repository = repository;
    }

    [HttpGet]
    public IActionResult GetAllExpenses()
    {
        var expenses = _repository.GetAll();
        var expenseDtos = _mapper.Map<List<ExpenseDto>>(expenses);
        return Ok(expenseDtos);
    }

    [HttpGet("{id}")]
    public IActionResult GetExpenseById(int id)
    {
        var expense = _repository.GetById(id);
        if (expense == null)
        {
            return NotFound($"Failed to get expense. The id {id} does not correspond to a valid expense.");
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
        var expense = _mapper.Map<Expense>(expenseDto);
        expenseDto.Id = 0;
        _repository.AddItem(expense);

        var createdExpenseDto = _mapper.Map<ExpenseDto>(expense);

        return CreatedAtAction(nameof(GetExpenseById), new { id = expense.Id }, createdExpenseDto); // returns the URL of the newly created expense - e.g. /api/Expenses/13
    }

    [HttpPut]
    public IActionResult UpdateExpenseWithId(int id, [FromBody] Expense expense)
    {
        if (expense == null)
        {
            return BadRequest("In order to update, new expense data is required.");
        }

        bool isValidId = _repository.UpdateItemWithId(id, expense);

        if (!isValidId)
        {
            return NotFound($"Failed to update expense. The id {id} does not correspond to a valid expense."); // Expense with the given ID doesn't exist
        }

        return Ok(expense);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteExpenseWithId(int id)
    {

        bool isValidId = _repository.DeleteItemWithId(id);
        if (!isValidId)
        {
            return NotFound($"Failed to delete expense. The id {id} does not correspond to a valid expense."); // Expense with the given ID doesn't exist
        }

        return NoContent();
    }
}
