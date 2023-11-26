using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class offeredcoursedeliverableid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverableSubmissions_CourseDeliverables_CourseDeliverableId",
                table: "CourseDeliverableSubmissions");

            migrationBuilder.RenameColumn(
                name: "CourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                newName: "OfferedCourseDeliverableId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverableSubmissions_CourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                newName: "IX_CourseDeliverableSubmissions_OfferedCourseDeliverableId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverableSubmissions_OfferedCourseDeliverables_OfferedCourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                column: "OfferedCourseDeliverableId",
                principalTable: "OfferedCourseDeliverables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverableSubmissions_OfferedCourseDeliverables_OfferedCourseDeliverableId",
                table: "CourseDeliverableSubmissions");

            migrationBuilder.RenameColumn(
                name: "OfferedCourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                newName: "CourseDeliverableId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverableSubmissions_OfferedCourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                newName: "IX_CourseDeliverableSubmissions_CourseDeliverableId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverableSubmissions_CourseDeliverables_CourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                column: "CourseDeliverableId",
                principalTable: "CourseDeliverables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
