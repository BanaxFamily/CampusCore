using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class SubmissionApproval : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdviserSignature",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DAAdviser",
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
                name: "DeanSignature",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "FacultySignature",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "PRCSignature",
                table: "Submissions");

            migrationBuilder.CreateTable(
                name: "Approvals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApproverId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ApproverRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    digitalSignature = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approvals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Approvals_AspNetUsers_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SubmissionApprovals",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubmissionId = table.Column<int>(type: "int", nullable: false),
                    ApprovalId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubmissionApprovals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubmissionApprovals_Approvals_ApprovalId",
                        column: x => x.ApprovalId,
                        principalTable: "Approvals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubmissionApprovals_Submissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Approvals_ApproverId",
                table: "Approvals",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionApprovals_ApprovalId",
                table: "SubmissionApprovals",
                column: "ApprovalId");

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionApprovals_SubmissionId",
                table: "SubmissionApprovals",
                column: "SubmissionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubmissionApprovals");

            migrationBuilder.DropTable(
                name: "Approvals");

            migrationBuilder.AddColumn<string>(
                name: "AdviserSignature",
                table: "Submissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DAAdviser",
                table: "Submissions",
                type: "datetime2",
                nullable: true);

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
                name: "DeanSignature",
                table: "Submissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FacultySignature",
                table: "Submissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PRCSignature",
                table: "Submissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
