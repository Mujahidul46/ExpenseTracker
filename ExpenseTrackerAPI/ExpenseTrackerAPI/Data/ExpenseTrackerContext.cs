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
            // Tell entity framework to use schema
            modelBuilder.Entity<Expense>().ToTable("Expenses", expensesSchema);
            modelBuilder.Entity<Category>().ToTable("Categories", expensesSchema);
            modelBuilder.Entity<User>().ToTable("Users", expensesSchema);

            // Populate CreatedAt and UpdatedAt with current datetime
            modelBuilder.Entity<Expense>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Expense>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
            
        }
    }
}
