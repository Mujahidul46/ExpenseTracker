﻿// <auto-generated />
using System;
using ExpenseTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ExpenseTrackerAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20250330133836_SeedingExpenseData")]
    partial class SeedingExpenseData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ExpenseTrackerAPI.Models.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Expenses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 50.00m,
                            Category = "Food",
                            Date = new DateTime(2025, 3, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Groceries"
                        },
                        new
                        {
                            Id = 2,
                            Amount = 30.00m,
                            Category = "Transportation",
                            Date = new DateTime(2025, 3, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Gas"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
