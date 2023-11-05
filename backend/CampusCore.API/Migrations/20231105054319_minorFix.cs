using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class minorFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliverables_Courses_CourseId",
                table: "Deliverables");

            migrationBuilder.DropIndex(
                name: "IX_Deliverables_CourseId",
                table: "Deliverables");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Deliverables");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Deliverables",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Deliverables_CourseId",
                table: "Deliverables",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliverables_Courses_CourseId",
                table: "Deliverables",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
