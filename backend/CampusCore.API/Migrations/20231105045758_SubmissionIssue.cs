using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class SubmissionIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Issues_Courses_CourseDeliverableId",
                table: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Issues_CourseDeliverableId",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "CourseDeliverableId",
                table: "Issues");

            migrationBuilder.AddColumn<int>(
                name: "IssueId",
                table: "SubmissionIssues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubmissionId",
                table: "SubmissionIssues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOpened",
                table: "Issues",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateClosed",
                table: "Issues",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionIssues_IssueId",
                table: "SubmissionIssues",
                column: "IssueId");

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionIssues_SubmissionId",
                table: "SubmissionIssues",
                column: "SubmissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionIssues_Issues_IssueId",
                table: "SubmissionIssues",
                column: "IssueId",
                principalTable: "Issues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionIssues_Submissions_SubmissionId",
                table: "SubmissionIssues",
                column: "SubmissionId",
                principalTable: "Submissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionIssues_Issues_IssueId",
                table: "SubmissionIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionIssues_Submissions_SubmissionId",
                table: "SubmissionIssues");

            migrationBuilder.DropIndex(
                name: "IX_SubmissionIssues_IssueId",
                table: "SubmissionIssues");

            migrationBuilder.DropIndex(
                name: "IX_SubmissionIssues_SubmissionId",
                table: "SubmissionIssues");

            migrationBuilder.DropColumn(
                name: "IssueId",
                table: "SubmissionIssues");

            migrationBuilder.DropColumn(
                name: "SubmissionId",
                table: "SubmissionIssues");

            migrationBuilder.AlterColumn<string>(
                name: "DateOpened",
                table: "Issues",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "DateClosed",
                table: "Issues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CourseDeliverableId",
                table: "Issues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Issues_CourseDeliverableId",
                table: "Issues",
                column: "CourseDeliverableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_Courses_CourseDeliverableId",
                table: "Issues",
                column: "CourseDeliverableId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
