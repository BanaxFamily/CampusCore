using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class Deliverable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Deliverable",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Deliverable_CourseId",
                table: "Deliverable",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliverable_Courses_CourseId",
                table: "Deliverable",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliverable_Courses_CourseId",
                table: "Deliverable");

            migrationBuilder.DropIndex(
                name: "IX_Deliverable_CourseId",
                table: "Deliverable");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Deliverable");
        }
    }
}
