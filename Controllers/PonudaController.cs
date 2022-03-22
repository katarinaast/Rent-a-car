using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;


namespace trip_it.Controllers{

    [ApiController]
    [Route("Ponuda")]
    public class PonudaController:ControllerBase{

        public RentACarContext Context { get; set; }

        public PonudaController(RentACarContext context){
            Context = context;
        }

       [Route("Filter")]
        [HttpGet]
        public async Task<ActionResult> Filtriraj(int idFirme ,string marka, string model, int minCena = 0,int maxCena = 0, int minGodiste=0, int maxGodiste=2022)
        {
          if (maxCena==0)
            {
                if (string.IsNullOrWhiteSpace(marka))
                {
                    var data = await Context.ponuda
                .Where(p =>  p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }

                else if (string.IsNullOrWhiteSpace(model))
                {
                    var data = await Context.ponuda
                .Where(p => p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.marka == marka && p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }

                else
                {
                        var data = await Context.ponuda
                .Where(p => p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.marka == marka && p.auto.model==model && p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }
            }
            else
            {
                if (string.IsNullOrWhiteSpace(marka))
                {
                    var data = await Context.ponuda
                .Where(p => p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.cenaPoDanu<=maxCena && p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }

                else if (string.IsNullOrWhiteSpace(model))
                {
                    var data = await Context.ponuda
                .Where(p => p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.marka == marka && p.auto.cenaPoDanu<=maxCena&& p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }
                else
                {
                            var data = await Context.ponuda
                .Where(p => p.firma.ID==idFirme && p.auto.cenaPoDanu >= minCena && p.auto.marka == marka && p.auto.model==model && p.auto.cenaPoDanu<=maxCena&& p.auto.godiste>=minGodiste && p.auto.godiste<=maxGodiste)
                .Include(p => p.auto)
                .Include(p => p.firma)
                .ToListAsync();
                if(data.Any() == true)
                    return Ok(data);
                else
                    return NotFound();
                }
            }
        
    
                
        }

        [HttpGet]
        [Route("VratiPonude")]
        public async Task<ActionResult> PrikaziPonude(int ID = -1){
            if(ID == -1)
            {
                var data = await Context.ponuda
                .Include(p => p.auto)
                .Include(p=>p.firma)
                .ToListAsync();
                return Ok(data);
            }else{
                
                var data = await Context.ponuda
                .Where(p => p.ID == ID)
                .Include(p => p.auto)
                .Include(p =>p.firma)
                .ToListAsync();
                if(data.Any())
                    return Ok(data);
                else
                    return NotFound();
            }
        }

        [HttpGet]
        [Route("VratiPonudePoFirmi")]
        public async Task<ActionResult> PrikaziPonudePoFirmi(int firma){
            if(firma == -1)
            {
                var data = await Context.ponuda
                .Include(p => p.auto)
                .Include(p=>p.firma)
                .ToListAsync();
                return Ok(data);
            }else{
                
                var data = await Context.ponuda
                .Include(p => p.auto)
                .Include(p=>p.firma)
                .Where(p => p.firma.ID == firma)
                .ToListAsync();
                if(data.Any())
                    return Ok(data);
                else
                    return NotFound();
            }
        }



       

        [HttpPost]
        public async Task<ActionResult> DodajPonudu(int IDAutomobila,int IDFirme){

            if(IDAutomobila < 0){
                return BadRequest("Neispravan ID");
            }


            try{
                Ponuda pon = new Ponuda();
                Automobil a = Context.auto.Find(IDAutomobila);
                Firma f = Context.firma.Find(IDFirme);

                pon.auto = a;
                pon.firma = f;

                Context.ponuda.Add(pon);
                await Context.SaveChangesAsync();

                return Ok("Sve je u redu.");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        //[Route("/")]
        [HttpPut]
        public async Task<ActionResult> PromeniPonudu(int ID, int IDAutomobila,int IDFirme){

            if(ID < 0){
                return BadRequest("Neispravan ID ponude.");
            }
            if(IDAutomobila < 0){
                return BadRequest("Neispravan ID automobila.");
            }
            if(IDFirme < 0){
                return BadRequest("Neispravan ID firme.");
            }
           

            try{
                var pon = Context.ponuda.Where(p => p.ID == ID).FirstOrDefault();

                if(pon != null){
                    Automobil a = Context.auto.Find(IDAutomobila);
                    Firma f = Context.firma.Find(IDFirme);

                    pon.firma = f;
                    pon.auto = a;
                    //pon.cena = cena;
                    //pon.datum = datum;

                    await Context.SaveChangesAsync();
                    return Ok("Sve je u redu.");
                }else{
                    return BadRequest("Pokusajte ponovo.");
                }
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> ObrisiPonudu(int ID){
            if(ID < 0){
                return BadRequest("Neispravan ID");
            }

            try{
                var pon = Context.ponuda.Find(ID);
                if(pon != null)
                {
                    Context.ponuda.Remove(pon);

                    await Context.SaveChangesAsync();
                    return Ok("Sve je u redu.");
                }else
                    return NotFound("Ne postoji ponuda sa ID:" + ID.ToString());
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }

}