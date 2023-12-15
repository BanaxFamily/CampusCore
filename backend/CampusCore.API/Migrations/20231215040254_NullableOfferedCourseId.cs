using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class NullableOfferedCourseId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_OfferedCourses_OfferedCourseId",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "OfferedCourseId",
                table: "Groups",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_OfferedCourses_OfferedCourseId",
                table: "Groups",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_OfferedCourses_OfferedCourseId",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "OfferedCourseId",
                table: "Groups",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_OfferedCourses_OfferedCourseId",
                table: "Groups",
                column: "OfferedCourseId",
                principalTable: "OfferedCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
