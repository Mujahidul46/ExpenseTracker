// xunit used
// naming convention: MethodName_Scenario_ExpectedResult

using ExpenseTrackerAPI.Controllers;
using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ExpenseTrackerAPI.Tests
{
    public class AuthControllerTests
    {
        // mock in memory database
        private ExpenseTrackerContext GetInMemoryDbContext()
        {
            // tells dbContext to connect to in-memory database
            var options = new DbContextOptionsBuilder<ExpenseTrackerContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // random db name so tests dont interfere with each other
                .Options;
            
            return new ExpenseTrackerContext(options);
        }

        // mock configuration
        private IConfiguration GetConfiguration()
        {
            return new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    {"Jwt:Key", "your-super-secret-key-that-is-at-least-32-characters-long"},
                    {"Jwt:Issuer", "test-issuer"},
                    {"Jwt:Audience", "test-audience"},
                    {"Jwt:ExpiryInMinutes", "60"}
                })
                .Build();
        }

        #region Signup Tests
        // This test is if user enters valid credentials (username, email, password), then the signup should be successful
        [Fact]
            // this is integration test actually cos it uses in memory db, unit test only meant to mock db. 
        public async Task SignUp_WithValidData_ReturnsOk()
        {
            // Arrange
            // Create signup request dto object
            // 
            var signUpDetails = new SignUpDto
            {
                Username = "testuser123",
                Email = "testuser123@outlook.com",
                Password = "TestPassword999!"
            };

            var dbContext = GetInMemoryDbContext();
            var configuration = GetConfiguration();

            var authController = new AuthController(dbContext, configuration);

            // Act
            // Call my endpoint and pass in the signup dto object
            var response = await authController.SignUp(signUpDetails);

            // Assert
            // Response should be 200 OK
            Assert.IsType<OkResult>(response);

            // Make this test better by doing below:
            // Verify user was actually created in database
        //    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == "testuser123");
        //    Assert.NotNull(user);
        //    Assert.Equal("testuser123@outlook.com", user.Email);
        //    Assert.False(user.IsAdmin);

        //    // Verify password was hashed (not stored as plain text)
        //    Assert.NotEqual("TestPassword999!", user.PasswordHash);
        //}

        // add test for trying to signup with an account that has USERNAME that already exists, should give error
        // add test for trying to signup with an account that has EMAIL that already exists, should give error
        #endregion

        #region Login Tests

        #endregion
    }
}
