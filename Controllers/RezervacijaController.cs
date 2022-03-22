using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;


namespace Controllers
{

    [ApiController]
    [Route("Rezervacija")]
    
    public class RezervacijaController:ControllerBase
    {
        public RentACarContext Context { get; set; }

        public RezervacijaController(RentACarContext context){
            Context = context;
        }
        
        [HttpGet]
        [Route("VratiRezervacije")]
        public async Task<ActionResult> VratiRezervaciju(int ID = -1, string JMBG = "none"){
            if(ID == -1 && JMBG == "none")
            {
                var data = await Context.rezervacija
                .Include(p => p.klijent)
                .Include(p => p.ponuda)
                .Include(p => p.ponuda.auto)
                .ToListAsync();
                return Ok(data);
            }else if(JMBG != "none"){
                var data = await Context.rezervacija
                .Where(p => p.klijent.JMBG == JMBG)
                .Include(p => p.klijent)
                .Include(p => p.ponuda)
                .ThenInclude(p => p.auto)
                .ToListAsync();
                return Ok(data);
            }else{
                
                var data = await Context.rezervacija
                .Where(p => p.ID == ID)
                .Include(p => p.klijent)
                .Include(p => p.ponuda)
                .Include(p => p.ponuda.auto)
                .ToListAsync();
                if(data.Any())
                    return Ok(data);
                else
                    return NotFound();
            }
        }
        
        [HttpPost]
        [Route("DodajRezervaciju")]
        public async Task<ActionResult> DodajRezervaciju(string JMBG, int IDponude, DateTime datumP, DateTime datumV, string mestoPreuzimanja, string mestoVracanja){

            if(string.IsNullOrWhiteSpace(JMBG))
                return BadRequest("Neispravan JMBG");
            if(IDponude < 0)
                return BadRequest("Neispravan ID ponude.");

            try
            {
                Rezervacija rez = new Rezervacija();
                Ponuda po = Context.ponuda.Find(IDponude);
                Klijent kli=new Klijent();
                kli = Context.klijent
                                .Where(p => p.JMBG == JMBG) 
                                .FirstOrDefault();
                if(kli != null)
                    rez.klijent = kli;
                else
                    return BadRequest("Nevalidni JMBG.");
                if (po!=null)
                    rez.ponuda = po;
                else
                    return BadRequest("Nevalidan ID ponude.");

                if (rez.datumPreuzimanja==datumP && rez.datumVracanja==datumV)
                    return BadRequest("Datum preuzimanja i vracanja koje ste uneli su identicni kao u postojecoj rezervaciji!");

                 if(datumV<datumP)
                    return BadRequest("Ne mozete postaviti kasnije preuzimanje od vracanja!");

                rez.mestoPreuzimanja=mestoPreuzimanja;
                rez.mestoPovratka=mestoVracanja;
                rez.datumPreuzimanja=datumP;
                rez.datumVracanja=datumV;
                //rez.cena=rez.ponuda.auto.cenaPoDanu*Int32.Parse((datumV-datumP).TotalDays.ToString())+rez.ponuda.auto.depozit;

                Context.rezervacija.Add(rez);
                await Context.SaveChangesAsync();
                return Ok();
            }
            
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        [HttpPut]
        [Route("IzmeniRezervaciju")]
        public async Task<ActionResult> IzmeniRezervaciju(int ID, DateTime datumP, DateTime datumV){
            if(ID < 0)
                return BadRequest("Nevalidan JMBG!");
            
            var data = Context.rezervacija.Find(ID);

            if(data == null)
                return NotFound("Ne postoji rezervacija sa ID-jem "+ID);
            
            if (data.datumPreuzimanja==datumP && data.datumVracanja==datumV)
                return BadRequest("Datum preuzimanja i vracanja koje ste uneli su identicni kao u postojecoj rezervaciji!");

            if(datumV<datumP)
                return BadRequest("Ne mozete postaviti kasnije preuzimanje od vracanja!");
            
           // if (DateTime.Today<datumP)
               // return BadRequest("Ne mozete izvrsiti rezervaciju u proslosti! "+ DateTime.Today);

            data.datumPreuzimanja=datumP;
            data.datumVracanja=datumV;
    
                        
            await Context.SaveChangesAsync();
            return Ok("Uspesno azurirana rezervacija");
        }


        [HttpDelete]
        [Route("ObrisiRezervaciju")]
        public async Task<ActionResult> ObrisiRezervaciju(int ID){
            if(ID < 0)
            {
                return BadRequest("Neispravan ID");
            }

            try
            {
                var rez = Context.rezervacija.Find(ID);
                if(rez != null)
                {
                    Context.rezervacija.Remove(rez);

                    await Context.SaveChangesAsync();
                    return Ok("Sve je u redu.");
                }
                else
                    return NotFound("Ne postoji rezervacija sa ID:" + ID.ToString());
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}