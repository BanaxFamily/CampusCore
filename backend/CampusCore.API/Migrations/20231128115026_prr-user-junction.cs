using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class prruserjunction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UserPublishedResearch",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPublishedResearch_ResearchId",
                table: "UserPublishedResearch",
                column: "ResearchId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPublishedResearch_UserId",
                table: "UserPublishedResearch",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPublishedResearch_AspNetUsers_UserId",
                table: "UserPublishedResearch",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPublishedResearch_ResearchRepository_ResearchId",
                table: "UserPublishedResearch",
                column: "ResearchId",
                principalTable: "ResearchRepository",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPublishedResearch_AspNetUsers_UserId",
                table: "UserPublishedResearch");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPublishedResearch_ResearchRepository_ResearchId",
                table: "UserPublishedResearch");

            migrationBuilder.DropIndex(
                name: "IX_UserPublishedResearch_ResearchId",
                table: "UserPublishedResearch");

            migrationBuilder.DropIndex(
                name: "IX_UserPublishedResearch_UserId",
                table: "UserPublishedResearch");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserPublishedResearch");
        }
    }
}
