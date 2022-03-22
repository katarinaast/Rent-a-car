using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;


namespace trip_it.Controllers{

    [ApiController]
    [Route("Automobil")]
    public class AutomobilController:ControllerBase{

        public RentACarContext Context { get; set; }

        public AutomobilController(RentACarContext context){
            Context = context;
        }

        [HttpGet]
        [Route("PreuzmiAutomobile")]
        public ActionResult Prikazi(int ID = -1){
            if(ID == -1)
                return Ok(Context.auto);
            else{
                var data = Context.auto
                .Where(p => p.ID == ID)
                .ToList();
                if(data.Any())
                    return Ok(data);
                else
                    return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> DodajAutomobil([FromBody] Automobil a){
            
            if(string.IsNullOrWhiteSpace(a.marka) || a.marka.Length > 50){
                return BadRequest("Lose uneta marka automobila.");
            }

            if(string.IsNullOrWhiteSpace(a.model) || a.model.Length > 50){
                return BadRequest("Lose unet model automobila");
            }


            try{
                Context.auto.Add(a);
                await Context.SaveChangesAsync();
                return Ok("Sve je u redu!");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
            
            
        }
        [HttpGet]
        [Route("PreuzmiMarke")]
        public ActionResult vratiMarke(){
            var data = Context.auto;
            var dict = new List<string>();
            foreach (var item in data)
            {
                if(dict.Contains(item.marka) == false)
                    dict.Add(item.marka);
            }
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(dict));
        }

        [HttpGet]
        [Route("PreuzmiModele")]
        public ActionResult vratiModele(string marka){
            var data = Context.auto
            .Where(p => p.marka == marka)
            .ToList();

            var dict = new List<string>();
            foreach (var item in data)
            {
                if(dict.Contains(item.model) == false)
                    dict.Add(item.model);
            }
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(dict));
        }
        
        

        [HttpDelete]
        public async Task<ActionResult> IzbrisiAutomobil(int ID){
            if(ID < 0){
                return BadRequest("Neispravan ID.");
            }

            try{

                var lok = Context.auto.Find(ID);
                Context.auto.Remove(lok);

                await Context.SaveChangesAsync();

                return Ok($"Izbrisana lokacija sa ID: {lok.ID}");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }

}