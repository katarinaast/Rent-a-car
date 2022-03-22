using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;

namespace trip_it.Controllers{

    [ApiController]
    [Route("Klijent")]
    public class KlijentController:ControllerBase{

         public RentACarContext Context { get; set; }

         public KlijentController(RentACarContext context){
             Context = context;
         }

        [HttpGet]
        [Route("VratiKlijenta")]
        public async Task<ActionResult> VratiKlijenta(string JMBG){
            
            if(string.IsNullOrWhiteSpace(JMBG))
            {
                var data = await Context.klijent
                    .ToListAsync();
                return Ok(data);
            }
            else{
                var data = await Context.klijent
                        .Where(p => p.JMBG == JMBG)
                        .ToListAsync();
                if(data.Any())
                    return Ok(data.First());
                else
                    return NotFound();
            }
        }

        [HttpPost]
        [Route("DodajKlijenta")]
        public async Task<ActionResult> DodajKlijenta(string jmbg, string ime, string prezime, string grad, string kontaktTelefon, string email){

            if(string.IsNullOrWhiteSpace(ime) || ime.Length > 50){
                return BadRequest("Lose uneto ime klijenta.");
            }

            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50){
                return BadRequest("Lose uneto prezime klijenta.");
            }

            if(string.IsNullOrWhiteSpace(jmbg) || jmbg.Length != 13){
                return BadRequest("Lose unet JMBG.");
            }

             if(string.IsNullOrWhiteSpace(grad) || grad.Length > 50){
                return BadRequest("Lose uneto ime grada.");
            }


             if(string.IsNullOrWhiteSpace(kontaktTelefon) || kontaktTelefon.Length < 9){
                return BadRequest("Lose unet broj telefona.");
            }

            try{
                var k=new Klijent();
                k.ime=ime;
                k.prezime=prezime;
                k.JMBG=jmbg;
                k.kontaktTelefon=kontaktTelefon;
                k.email=email;
                k.grad=grad;
                Context.klijent.Add(k);
                await Context.SaveChangesAsync();
                return Ok("Dodat je novi klijent!");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> ObrisiKlijenta(int ID){

            if(ID < 0)
                return BadRequest("Neispravan ID.");
            
            try{
                var data = Context.klijent.Find(ID);
                if(data != null)
                {
                    Context.klijent.Remove(data);

                    await Context.SaveChangesAsync();
                    return Ok("Sve je u redu.");
                }else
                    return NotFound("Ne postoji rezervacija sa ID:" + ID.ToString());
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}