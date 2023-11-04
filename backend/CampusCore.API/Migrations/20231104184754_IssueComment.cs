using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class IssueComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverable_Deliverable_DeliverableId",
                table: "CourseDeliverable");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverable_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverable");

            migrationBuilder.DropForeignKey(
                name: "FK_Deliverable_Courses_CourseId",
                table: "Deliverable");

            migrationBuilder.DropForeignKey(
                name: "FK_Issue_AspNetUsers_UserId",
                table: "Issue");

            migrationBuilder.DropForeignKey(
                name: "FK_Issue_Courses_CourseDeliverableId",
                table: "Issue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubmissionIssue",
                table: "SubmissionIssue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Issue",
                table: "Issue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Deliverable",
                table: "Deliverable");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseDeliverable",
                table: "CourseDeliverable");

            migrationBuilder.RenameTable(
                name: "SubmissionIssue",
                newName: "SubmissionIssues");

            migrationBuilder.RenameTable(
                name: "Issue",
                newName: "Issues");

            migrationBuilder.RenameTable(
                name: "Deliverable",
                newName: "Deliverables");

            migrationBuilder.RenameTable(
                name: "CourseDeliverable",
                newName: "CourseDeliverables");

            migrationBuilder.RenameIndex(
                name: "IX_Issue_UserId",
                table: "Issues",
                newName: "IX_Issues_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Issue_CourseDeliverableId",
                table: "Issues",
                newName: "IX_Issues_CourseDeliverableId");

            migrationBuilder.RenameIndex(
                name: "IX_Deliverable_CourseId",
                table: "Deliverables",
                newName: "IX_Deliverables_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverable_OfferedCourseId",
                table: "CourseDeliverables",
                newName: "IX_CourseDeliverables_OfferedCourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverable_DeliverableId",
                table: "CourseDeliverables",
                newName: "IX_CourseDeliverables_DeliverableId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubmissionIssues",
                table: "SubmissionIssues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Issues",
                table: "Issues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deliverables",
                table: "Deliverables",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseDeliverables",
                table: "CourseDeliverables",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "IssueComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IssueId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CommentText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IssueComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IssueComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_IssueComments_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IssueComments_IssueId",
                table: "IssueComments",
                column: "IssueId");

            migrationBuilder.CreateIndex(
                name: "IX_IssueComments_UserId",
                table: "IssueComments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverables_Deliverables_DeliverableId",
                table: "CourseDeliverables",
                column: "DeliverableId",
                principalTable: "Deliverables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverables_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverables",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deliverables_Courses_CourseId",
                table: "Deliverables",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_AspNetUsers_UserId",
                table: "Issues",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_Courses_CourseDeliverableId",
                table: "Issues",
                column: "CourseDeliverableId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverables_Deliverables_DeliverableId",
                table: "CourseDeliverables");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseDeliverables_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverables");

            migrationBuilder.DropForeignKey(
                name: "FK_Deliverables_Courses_CourseId",
                table: "Deliverables");

            migrationBuilder.DropForeignKey(
                name: "FK_Issues_AspNetUsers_UserId",
                table: "Issues");

            migrationBuilder.DropForeignKey(
                name: "FK_Issues_Courses_CourseDeliverableId",
                table: "Issues");

            migrationBuilder.DropTable(
                name: "IssueComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubmissionIssues",
                table: "SubmissionIssues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Issues",
                table: "Issues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Deliverables",
                table: "Deliverables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseDeliverables",
                table: "CourseDeliverables");

            migrationBuilder.RenameTable(
                name: "SubmissionIssues",
                newName: "SubmissionIssue");

            migrationBuilder.RenameTable(
                name: "Issues",
                newName: "Issue");

            migrationBuilder.RenameTable(
                name: "Deliverables",
                newName: "Deliverable");

            migrationBuilder.RenameTable(
                name: "CourseDeliverables",
                newName: "CourseDeliverable");

            migrationBuilder.RenameIndex(
                name: "IX_Issues_UserId",
                table: "Issue",
                newName: "IX_Issue_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Issues_CourseDeliverableId",
                table: "Issue",
                newName: "IX_Issue_CourseDeliverableId");

            migrationBuilder.RenameIndex(
                name: "IX_Deliverables_CourseId",
                table: "Deliverable",
                newName: "IX_Deliverable_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverables_OfferedCourseId",
                table: "CourseDeliverable",
                newName: "IX_CourseDeliverable_OfferedCourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseDeliverables_DeliverableId",
                table: "CourseDeliverable",
                newName: "IX_CourseDeliverable_DeliverableId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubmissionIssue",
                table: "SubmissionIssue",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Issue",
                table: "Issue",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deliverable",
                table: "Deliverable",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseDeliverable",
                table: "CourseDeliverable",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverable_Deliverable_DeliverableId",
                table: "CourseDeliverable",
                column: "DeliverableId",
                principalTable: "Deliverable",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseDeliverable_OfferedCourses_OfferedCourseId",
                table: "CourseDeliverable",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deliverable_Courses_CourseId",
                table: "Deliverable",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Issue_AspNetUsers_UserId",
                table: "Issue",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Issue_Courses_CourseDeliverableId",
                table: "Issue",
                column: "CourseDeliverableId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
