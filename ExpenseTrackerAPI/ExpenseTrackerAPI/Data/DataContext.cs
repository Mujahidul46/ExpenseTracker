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
            base.OnModelCreating(modelBuilder);

            // Configure Amount column precision and scale
            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasPrecision(18, 2); // Precision (18) and Scale (2)

            modelBuilder.Entity<Expense>().HasData(
                new Expense { Id=1, Description = "Groceries", Amount = 50.00m, Date = new DateTime(2025, 3, 30), Category = "Food" },
                new Expense { Id=2, Description = "Gas", Amount = 30.00m, Date = new DateTime(2025, 3, 30), Category = "Transportation" }
            );
        }
    }
}
