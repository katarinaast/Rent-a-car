using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Models{

    public class RentACarContext : DbContext{


            public DbSet<Firma> firma {get;set;}
            
            public DbSet<Klijent> klijent { get; set; }

            public DbSet<Automobil> auto { get; set; }

            public DbSet<Ponuda> ponuda { get; set; }

            public DbSet<Rezervacija> rezervacija { get; set; }
            
            public RentACarContext(DbContextOptions options) : base(options){

            }

    }
}