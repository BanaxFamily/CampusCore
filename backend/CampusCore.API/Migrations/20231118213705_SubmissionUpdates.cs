using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class SubmissionUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Group_StudentGroupId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DateApproved",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "StudentGroupId",
                table: "Submissions",
                newName: "GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_StudentGroupId",
                table: "Submissions",
                newName: "IX_Submissions_GroupId");

            migrationBuilder.AddColumn<DateTime>(
                name: "DADean",
                table: "Submissions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DAFaculty",
                table: "Submissions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DAPRC",
                table: "Submissions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Submissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Group_GroupId",
                table: "Submissions",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Group_GroupId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DADean",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DAFaculty",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DAPRC",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "Submissions",
                newName: "StudentGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_GroupId",
                table: "Submissions",
                newName: "IX_Submissions_StudentGroupId");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateApproved",
                table: "Submissions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Group_StudentGroupId",
                table: "Submissions",
                column: "StudentGroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
