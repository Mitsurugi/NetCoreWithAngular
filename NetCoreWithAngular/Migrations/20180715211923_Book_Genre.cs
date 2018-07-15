using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreWithAngular.Migrations
{
    public partial class Book_Genre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Genre",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Genre",
                table: "Books");
        }
    }
}
