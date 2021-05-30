using Microsoft.EntityFrameworkCore.Migrations;

namespace PS.API.Migrations
{
    public partial class AddPaintingLanguages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionDe",
                table: "Paintings",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionGb",
                table: "Paintings",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionRu",
                table: "Paintings",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameDe",
                table: "Paintings",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameGb",
                table: "Paintings",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameRu",
                table: "Paintings",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionDe",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "DescriptionGb",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "DescriptionRu",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "NameDe",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "NameGb",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "NameRu",
                table: "Paintings");
        }
    }
}
