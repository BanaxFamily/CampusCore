using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class AdjustedCourseDeliverable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverables_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverables");

            migrationBuilder.RenameColumn(
                name: "OfferedCourseId",
                table: "CourseDeliverables",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverables_OfferedCourseId",
                table: "CourseDeliverables",
                newName: "IX_CourseDeliverables_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverables_Courses_CourseId",
                table: "CourseDeliverables",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverables_Courses_CourseId",
                table: "CourseDeliverables");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "CourseDeliverables",
                newName: "OfferedCourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverables_CourseId",
                table: "CourseDeliverables",
                newName: "IX_CourseDeliverables_OfferedCourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverables_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverables",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
