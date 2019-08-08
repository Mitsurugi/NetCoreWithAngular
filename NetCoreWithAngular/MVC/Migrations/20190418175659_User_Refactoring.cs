using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreWithAngular.Migrations
{
    public partial class User_Refactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleDisplayName",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleDisplayName",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
