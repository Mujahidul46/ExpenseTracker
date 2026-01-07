using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHashToUserAndChangedNameToUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "ex",
                table: "Users",
                newName: "Username");

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                schema: "ex",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                schema: "ex",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Username",
                schema: "ex",
                table: "Users",
                newName: "Name");
        }
    }
}
