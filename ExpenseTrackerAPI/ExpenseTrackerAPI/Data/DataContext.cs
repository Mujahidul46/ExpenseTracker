using Microsoft.EntityFrameworkCore;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>().HasData(
                new Expense
                {
                    ExpenseID = 10,
                    Description = "Nintendo Switch",
                    Amount = 200,
                    Date = new DateTime(2025, 3, 29),
                    Category = "Gaming"
                }
            );
        }
    }
}
