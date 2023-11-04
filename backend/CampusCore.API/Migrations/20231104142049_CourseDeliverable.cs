using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class CourseDeliverable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Deliverable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Instruction = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliverable", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseDeliverable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OfferedCourseId = table.Column<int>(type: "int", nullable: false),
                    DeliverableId = table.Column<int>(type: "int", nullable: false),
                    DeliverableDeadline = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseDeliverable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseDeliverable_Deliverable_DeliverableId",
                        column: x => x.DeliverableId,
                        principalTable: "Deliverable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseDeliverable_DeliverableId",
                table: "CourseDeliverable",
                column: "DeliverableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseDeliverable");

            migrationBuilder.DropTable(
                name: "Deliverable");
        }
    }
}
