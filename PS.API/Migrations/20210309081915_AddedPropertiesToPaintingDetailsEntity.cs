using Microsoft.EntityFrameworkCore.Migrations;

namespace PS.API.Migrations
{
    public partial class AddedPropertiesToPaintingDetailsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Paintings",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "SizeX",
                table: "Paintings",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SizeY",
                table: "Paintings",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "SizeX",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "SizeY",
                table: "Paintings");
        }
    }
}
