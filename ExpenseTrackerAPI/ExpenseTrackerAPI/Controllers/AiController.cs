using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace ExpenseTrackerAPI.Controllers
{

    
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class AiController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ExpenseTrackerContext _dbContext;
        public AiController(IConfiguration configuration, IHttpClientFactory httpClientFactory, ExpenseTrackerContext dbContext)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
            _dbContext = dbContext;
        }

        [HttpPost("suggest-category")]
        // TODO: implement AI category suggestion logic
        // URL!!!! https://huggingface.co/facebook/bart-large-mnli !!!!!!!
        // 1000 requests per 5 mins
        // rate limits: https://huggingface.co/docs/hub/rate-limits#rate-limit-tiers
        // inputs/outputs: https://huggingface.co/docs/inference-providers/tasks/zero-shot-classification

        public async Task<ActionResult<string>> GetSuggestedCategory([FromBody] SuggestCategoryRequestDto request) {
            try
            {
                string apiUrl = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli";
                string token = _configuration["HuggingFace:ApiKey"];
                if (string.IsNullOrEmpty(token))
                {
                    return StatusCode(500, "Issue with Hugging Face API token");
                }

                var categories = await _dbContext.Categories.ToListAsync();
                var listOfCategoriesWithKeywords = categories
                        .Select(c => $"{c.Name} ({c.Keywords})")
                        .ToList();

                var payload = new
                {
                    inputs = request.ExpenseName,
                    parameters = new
                    {
                        candidate_labels = listOfCategoriesWithKeywords
                    }
                };

                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var jsonContent = JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    var errorMessage = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, $"Hugging face API call gave error: {errorMessage}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Hugging Face response: " + responseContent);
                var results = JsonSerializer.Deserialize<List<HuggingFaceResponseDto>>(responseContent);

                string suggestedCategoryWithKeywords = results?[0].label ?? "Unknown";
                string suggestedCategory = suggestedCategoryWithKeywords.Split("(")[0].Trim();
                return Ok(new
                {
                    suggestedCategory = suggestedCategory,
                    confidence = results?[0].score ?? 0.0
                });

            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Error suggesting category {ex.Message}");
            }
        }
    }
}
