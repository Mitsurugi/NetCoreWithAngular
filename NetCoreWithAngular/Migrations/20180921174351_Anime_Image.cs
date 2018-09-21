using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreWithAngular.Migrations
{
    public partial class Anime_Image : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Animes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Data = table.Column<byte[]>(nullable: true),
                    MimeType = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Animes_ImageId",
                table: "Animes",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Animes_Files_ImageId",
                table: "Animes",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Animes_Files_ImageId",
                table: "Animes");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Animes_ImageId",
                table: "Animes");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Animes");
        }
    }
}
