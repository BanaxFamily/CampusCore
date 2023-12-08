using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class updateApproverId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "ResearchRepository",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverId",
                table: "ResearchRepository",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ResearchRepository_AspNetUsers_ApproverId",
                table: "ResearchRepository",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
