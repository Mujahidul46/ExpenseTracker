using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using ExpenseTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ExpenseTrackerContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(ExpenseTrackerContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
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

        [HttpPost("login")]
        public async Task<ActionResult> LogIn(LogInDto logInDto)
        {
            // check email or username exists in db
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == logInDto.EmailOrUsername || u.Username == logInDto.EmailOrUsername);

            // if email/username not found, return bad request
            if (user == null)
            {
                return Unauthorized("Invalid email/username or password.");
            }

            // check password given matches the hashed password in db
            if (!BCrypt.Net.BCrypt.Verify(logInDto.Password, user.PasswordHash))
            {
                return Unauthorized("Login failed. Invalid email/username or password.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                UserId = user.Id,
                Username = user.Username,
                IsAdmin = user.IsAdmin
            });
        }

        private string GenerateJwtToken(User user) // Meant to be private? Meant to pass in dto?
        {
            var jwtSettings = _configuration.GetSection("Jwt");

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(jwtSettings["ExpiryInMinutes"])
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token); // this actually returns token, with signature. Signature is made up from header, payload, secret key
        }
    }
}
