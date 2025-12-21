using Microsoft.EntityFrameworkCore;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Data
{
    public class ExpenseTrackerContext : DbContext
    {
        public string expensesSchema = "ex";
        public ExpenseTrackerContext(DbContextOptions<ExpenseTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>().ToTable("Expenses", expensesSchema);
            modelBuilder.Entity<Category>().ToTable("Categories", expensesSchema);
            modelBuilder.Entity<User>().ToTable("Users", expensesSchema);
            // add other tables too
        }
    }
}
