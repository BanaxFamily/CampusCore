using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampusCore.API.Migrations
{
    public partial class AddedDigitalSignatureToImplementation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EncryptedKeyPair",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<byte[]>(
                name: "EncryptedPrivateKey",
                table: "AspNetUsers",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EncryptionKeys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Iv = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EncryptionKeys", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EncryptionKeys");

            migrationBuilder.DropColumn(
                name: "EncryptedPrivateKey",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "EncryptedKeyPair",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
