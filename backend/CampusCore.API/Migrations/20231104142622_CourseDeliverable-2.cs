using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class CourseDeliverable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CourseDeliverable_OfferedCourseId",
                table: "CourseDeliverable",
                column: "OfferedCourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverable_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverable",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverable_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverable");

            migrationBuilder.DropIndex(
                name: "IX_CourseDeliverable_OfferedCourseId",
                table: "CourseDeliverable");
        }
    }
}
