using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace RentACar.Controllers
{

    [ApiController]
    [Route("Firma")]
    public class FirmaController:ControllerBase
    {

        public RentACarContext Context { get; set; }

        public FirmaController(RentACarContext context)
        {
            Context = context;
        }


        [HttpGet]
        [Route("PreuzmiFirme")]
        public async Task<ActionResult> VratiFirmu(int idFirme = 0)
        {
            if(idFirme < 0)
                return BadRequest("Nevalidan ID");

            if(idFirme == 0)
            {
                var data = await Context.firma.ToListAsync();
                return Ok(data);

            }
           
            else
            {
                var data = await Context.firma.FindAsync(idFirme);

                if(data == null) return NotFound("Ne postoji firma sa tim ID-jem");            
                return Ok(data);
            }
        }

        [HttpPost]
        public async Task<ActionResult> DodajFirmu(Firma a)
        {
            Context.firma.Add(a);
            try
            {
                await Context.SaveChangesAsync();
                return Ok("Sve je u redu !");  
            }
            
            catch
            {
                return BadRequest("Greska pri dodavanju");
            }
                      
        }

        
        [HttpPut]
        public async Task<ActionResult> IzmeniFirmu(int ID, Firma temp)
        {
            var podatak = Context.firma.Find(ID);
            if(podatak == null) return NotFound("Podatak nije nadjen !");

            podatak.imeFirme = temp.imeFirme;
            podatak.kontaktTelefon = temp.kontaktTelefon;
            podatak.email = temp.email;
            podatak.adresa = temp.adresa;
            
            await Context.SaveChangesAsync();
            return Ok("Podatak izmenjen !");
             
        }

        [HttpDelete]
        public async Task<ActionResult> ObrisiFirmu(int ID)
        {
            if(ID < 0)
            {
                return BadRequest("Neispravan ID");
            }

            try
            {
                var pon = Context.firma.Find(ID);
                if(pon != null)
                {
                    Context.firma.Remove(pon);

                    await Context.SaveChangesAsync();
                    return Ok("Sve je u redu.");
                }
                else
                    return NotFound("Ne postoji agencija sa ID:" + ID.ToString());
            }
            
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }

}