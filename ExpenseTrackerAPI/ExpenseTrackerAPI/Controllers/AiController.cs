using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{

    
    [ApiController]
    [Route("controller")]
    [Authorize]
    public class AiController : Controller
    {
        private readonly IConfiguration _configuration;
        public AiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("suggest-category")]
        // TODO: implement AI category suggestion logic
        // https://huggingface.co/facebook/bart-large-mnli
        // 30000 tokens max (free tier)

        public async ActionResult GetSuggestedCategory(string expenseName, List<string> categories) {
            // call the hugging face API and pass it the expense name, and the list of categories.
            // Also in API request need to attach token, which is stored in my user secrets "HuggingFace:ApiKey": "secretvalueishere"
            string apiUrl = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli";
            string token = _configuration["HuggingFace:ApiKey"];

            // Store result of the API response

            // if success, return Ok(suggestedCategory);

            // If error, return StatusCode(500, "Error suggesting category");
        }

    }
}
