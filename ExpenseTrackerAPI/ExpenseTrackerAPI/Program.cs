using ExpenseTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Choose your database!

//builder.Services.AddScoped<IRepository<Expense>, SqlRepository<Expense>>(); // Uses SQL database
string filePath = "C:\\Users\\Mujah\\OneDrive\\Desktop\\ExpenseTrackerApp\\ExpenseTrackerAPI\\ExpenseTrackerAPI\\Data\\Expense.json";
builder.Services.AddScoped<IRepository<Expense>>(provider => new JsonRepository<Expense>(filePath)); // Uses Json database
// to do add in memory storage

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Use CORS policy
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();