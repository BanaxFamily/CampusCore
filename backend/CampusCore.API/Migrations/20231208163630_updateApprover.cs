using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class updateApprover : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approver",
                table: "ResearchRepository");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "ResearchRepository",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchRepository_ApproverId",
                table: "ResearchRepository",
                column: "ApproverId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository");

            migrationBuilder.DropIndex(
                name: "IX_ResearchRepository_ApproverId",
                table: "ResearchRepository");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "ResearchRepository",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Approver",
                table: "ResearchRepository",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
