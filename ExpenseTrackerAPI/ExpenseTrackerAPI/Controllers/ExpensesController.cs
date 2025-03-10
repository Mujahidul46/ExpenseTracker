using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetExpenses()
    {
        var expenses = new List<object> {
            new { Id = 1, Category = "Food", Amount = 50 },
            new { Id = 2, Category = "Transport", Amount = 30 }
        };
        return Ok(expenses);
    }
}
