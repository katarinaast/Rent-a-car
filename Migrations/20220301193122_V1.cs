using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RentACarV2.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "auto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    marka = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    model = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    godiste = table.Column<int>(type: "int", nullable: false),
                    cenaPoDanu = table.Column<int>(type: "int", nullable: false),
                    depozit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_auto", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "firma",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    imeFirme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kontaktTelefon = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_firma", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "klijent",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    grad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kontaktTelefon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_klijent", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ponuda",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    autoID = table.Column<int>(type: "int", nullable: true),
                    firmaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ponuda", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ponuda_auto_autoID",
                        column: x => x.autoID,
                        principalTable: "auto",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ponuda_firma_firmaID",
                        column: x => x.firmaID,
                        principalTable: "firma",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "rezervacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mestoPreuzimanja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mestoPovratka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    klijentID = table.Column<int>(type: "int", nullable: true),
                    ponudaID = table.Column<int>(type: "int", nullable: true),
                    datumPreuzimanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    datumVracanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    cena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rezervacija", x => x.ID);
                    table.ForeignKey(
                        name: "FK_rezervacija_klijent_klijentID",
                        column: x => x.klijentID,
                        principalTable: "klijent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_rezervacija_ponuda_ponudaID",
                        column: x => x.ponudaID,
                        principalTable: "ponuda",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ponuda_autoID",
                table: "ponuda",
                column: "autoID");

            migrationBuilder.CreateIndex(
                name: "IX_ponuda_firmaID",
                table: "ponuda",
                column: "firmaID");

            migrationBuilder.CreateIndex(
                name: "IX_rezervacija_klijentID",
                table: "rezervacija",
                column: "klijentID");

            migrationBuilder.CreateIndex(
                name: "IX_rezervacija_ponudaID",
                table: "rezervacija",
                column: "ponudaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "rezervacija");

            migrationBuilder.DropTable(
                name: "klijent");

            migrationBuilder.DropTable(
                name: "ponuda");

            migrationBuilder.DropTable(
                name: "auto");

            migrationBuilder.DropTable(
                name: "firma");
        }
    }
}
