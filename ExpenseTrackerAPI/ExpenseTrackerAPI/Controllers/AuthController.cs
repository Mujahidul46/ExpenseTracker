using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using ExpenseTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ExpenseTrackerContext _dbContext;
        public AuthController(ExpenseTrackerContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("signup")]
        public async Task<ActionResult> SignUp(SignUpDto signUpDto)
        {
            var random = new Random();
            if (await _dbContext.Users.AnyAsync(u => u.Username == signUpDto.Username))
            {
                return BadRequest("A user with that username already exists.");
            }

            if (await _dbContext.Users.AnyAsync(u => u.Email == signUpDto.Email))
            {
                return BadRequest("A user with that email already exists.");
            }
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(signUpDto.Password);

            // store the username, email, password in the database, create random dob for now
            var newUser = new User
            {
                Username = signUpDto.Username,
                Email = signUpDto.Email,
                PasswordHash = passwordHashed,
                IsAdmin = false,
                DateOfBirth = DateOnly.FromDateTime(
                    DateTime.Today.AddYears(-random.Next(18,65)).AddDays(-random.Next(0, 365))
                    )
            };

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
