using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class ResearchViewLogAdjusted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ResearchViewLogs",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ResearchId",
                table: "ResearchViewLogs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ResearchViewLogs_ResearchId",
                table: "ResearchViewLogs",
                column: "ResearchId");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchViewLogs_UserId",
                table: "ResearchViewLogs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResearchViewLogs_AspNetUsers_UserId",
                table: "ResearchViewLogs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ResearchViewLogs_ResearchRepository_ResearchId",
                table: "ResearchViewLogs",
                column: "ResearchId",
                principalTable: "ResearchRepository",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResearchViewLogs_AspNetUsers_UserId",
                table: "ResearchViewLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_ResearchViewLogs_ResearchRepository_ResearchId",
                table: "ResearchViewLogs");

            migrationBuilder.DropIndex(
                name: "IX_ResearchViewLogs_ResearchId",
                table: "ResearchViewLogs");

            migrationBuilder.DropIndex(
                name: "IX_ResearchViewLogs_UserId",
                table: "ResearchViewLogs");

            migrationBuilder.DropColumn(
                name: "ResearchId",
                table: "ResearchViewLogs");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ResearchViewLogs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
