using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Mappings;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

// TEMPORARILY DISABLED - using Environment Variables instead
// azure key vault used in prod
// if (!builder.Environment.IsDevelopment())
// {
//     var keyVaultUrl = builder.Configuration["KeyVault:Url"];
//     if (!string.IsNullOrEmpty(keyVaultUrl))
//     {
//         try
//         {
//             builder.Configuration.AddAzureKeyVault(
//                 new Uri(keyVaultUrl),
//                 new DefaultAzureCredential());
//         }
//         catch (Exception ex)
//         {
//             // Key Vault connection failed - will use environment variables instead
//             Console.WriteLine($"Key Vault connection failed: {ex.Message}");
//         }
//     }
// }

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",
                "https://localhost:4200",
                "https://wonderful-sea-0bb7cd003.2.azurestaticapps.net"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .WithExposedHeaders("New-Auth-Token");
    });
});

// Configure JWT Authentication
var jwtConfig = builder.Configuration.GetSection("Jwt");
var secretKey = jwtConfig["Key"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwtOptions =>
{
    jwtOptions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtConfig["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtConfig["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger to use JWT Authentication (Adds Authorize button in Swagger UI)
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter 'Bearer' followed by a space and your JWT token"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
builder.Services.AddDbContext<ExpenseTrackerContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ExpenseDb")));

var app = builder.Build();

// Only enable swagger in development environment
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// Only use for testing
app.UseSwagger();
app.UseSwaggerUI();
////////////////////////////

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
