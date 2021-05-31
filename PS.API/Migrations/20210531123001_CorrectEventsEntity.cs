using Microsoft.EntityFrameworkCore.Migrations;

namespace PS.API.Migrations
{
    public partial class CorrectEventsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DescriptionRu",
                table: "Events",
                newName: "TextRu");

            migrationBuilder.RenameColumn(
                name: "DescriptionGb",
                table: "Events",
                newName: "TextGb");

            migrationBuilder.RenameColumn(
                name: "DescriptionDe",
                table: "Events",
                newName: "TextDe");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TextRu",
                table: "Events",
                newName: "DescriptionRu");

            migrationBuilder.RenameColumn(
                name: "TextGb",
                table: "Events",
                newName: "DescriptionGb");

            migrationBuilder.RenameColumn(
                name: "TextDe",
                table: "Events",
                newName: "DescriptionDe");
        }
    }
}
