using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class cdsubmission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseEnrollments",
                table: "CourseEnrollments");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CourseEnrollments",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseEnrollments",
                table: "CourseEnrollments",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CourseDeliverableSubmissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseDeliverableId = table.Column<int>(type: "int", nullable: false),
                    SubmissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseDeliverableSubmissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseDeliverableSubmissions_CourseDeliverables_CourseDeliverableId",
                        column: x => x.CourseDeliverableId,
                        principalTable: "CourseDeliverables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseDeliverableSubmissions_Submissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseEnrollments_OfferedCourseId",
                table: "CourseEnrollments",
                column: "OfferedCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseDeliverableSubmissions_CourseDeliverableId",
                table: "CourseDeliverableSubmissions",
                column: "CourseDeliverableId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseDeliverableSubmissions_SubmissionId",
                table: "CourseDeliverableSubmissions",
                column: "SubmissionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseDeliverableSubmissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseEnrollments",
                table: "CourseEnrollments");

            migrationBuilder.DropIndex(
                name: "IX_CourseEnrollments_OfferedCourseId",
                table: "CourseEnrollments");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CourseEnrollments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseEnrollments",
                table: "CourseEnrollments",
                columns: new[] { "OfferedCourseId", "StudentId" });
        }
    }
}
