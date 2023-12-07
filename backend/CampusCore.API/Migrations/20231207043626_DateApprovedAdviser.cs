using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class DateApprovedAdviser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliverableDeadline",
                table: "CourseDeliverables");

            migrationBuilder.AddColumn<DateTime>(
                name: "DAAdviser",
                table: "Submissions",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DAAdviser",
                table: "Submissions");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliverableDeadline",
                table: "CourseDeliverables",
                type: "datetime2",
                nullable: true);
        }
    }
}
