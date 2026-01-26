using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("controller")]
    [Authorize]
    public class AiController : Controller
    {
        [HttpPost("suggest-category")]
        // TODO: implement AI category suggestion logic
        // https://huggingface.co/facebook/bart-large-mnli
        // 30000 tokens max (free tier)

    }
}
