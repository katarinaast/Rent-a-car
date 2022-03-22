import { Ponuda } from "./Ponuda.js";

export class Rezervacija{

    constructor(id, mestoPreuzimanja, mestoPovratka, klijent, ponuda, datumPreuzimanja, datumVracanja, cena){
        this.id=id;
        this.mestoPreuzimanja=mestoPreuzimanja;
        this.mestoPovratka=mestoPovratka;
        this.klijent=klijent;
        this.ponuda=ponuda;
        this.datumPreuzimanja=datumPreuzimanja;
        this.datumVracanja=datumVracanja;
        this.cena=cena;
    }

    crtajRezervacije(host){

        let rezervacija=document.createElement("div");
        rezervacija.classList.add("rezervacijaCrtanjeDiv");

        let naziv=document.createElement("h4");
        naziv.innerHTML=this.ponuda.auto.marka + " " + this.ponuda.auto.model;
        naziv.classList.add("nazivAutaRezervacija");
        rezervacija.appendChild(naziv);

        let datumi=document.createElement("div");
        datumi.classList.add("datumiRezervacije");
        let datPo=new Date(this.datumPreuzimanja).toDateString();
        let datVr=new Date(this.datumVracanja).toDateString();

        let datumP=document.createElement("label");
        datumP.classList.add("datumPreuz");
        datumP.innerHTML="Datum preuzimanja: "+ datPo +"<br>";

        let datumV=document.createElement("label");
        datumV.classList.add("datumVrac");
        datumV.innerHTML=" Datum vraćanja: " + datVr + "";
    
        datumi.appendChild(datumP);
        datumi.appendChild(datumV);

        rezervacija.appendChild(datumi);

        let datP=new Date(this.datumPreuzimanja);
        let datV=new Date(this.datumVracanja);
        //console.log(typeof(datP));

        let dani=(datV.getTime() - datP.getTime())/(1000*3600*24);
        let ukupnaCena=dani*this.ponuda.auto.cenaPoDanu + this.ponuda.auto.depozit;

        let mesta=document.createElement("div");
        mesta.classList.add("mestaRezervacije");

        let mestoP=document.createElement("label");
        mestoP.innerHTML="Mesto preuzimanja: " + this.mestoPreuzimanja + "<br>";

        let mestoV=document.createElement("label");
        mestoV.innerHTML="Mesto vracanja: " + this.mestoPovratka + "";

        mesta.appendChild(mestoP);
        mesta.appendChild(mestoV);

        rezervacija.appendChild(mesta);
        
        let cena=document.createElement("h4");
        cena.classList.add("cenaRezervacije")
        cena.innerHTML= "Ukupna cena je: " + ukupnaCena;
        rezervacija.appendChild(cena);

        let dugmici=document.createElement("div");
        dugmici.classList.add("dugmiciRezervacijaDiv");

        let izmeniRezervaciju=document.createElement("button");
        izmeniRezervaciju.innerHTML="Izmeni";
        izmeniRezervaciju.classList.add("izmeniRezervaciju");
        dugmici.appendChild(izmeniRezervaciju);

        let divZaIzmene=document.createElement("div");
        divZaIzmene.classList.add("divZaIzmene");
        dugmici.appendChild(divZaIzmene);


        let obrisiRezervaciju=document.createElement("button");
        obrisiRezervaciju.innerHTML="Obriši";
        obrisiRezervaciju.classList.add("obrisiRezervaciju");
        dugmici.appendChild(obrisiRezervaciju);

        rezervacija.appendChild(dugmici);

        host.appendChild(rezervacija);

        izmeniRezervaciju.addEventListener("click", ()=>this.izmeni(divZaIzmene));
        obrisiRezervaciju.addEventListener("click", ()=>this.obrisi(rezervacija));
    }

 

    izmeni(divZaIzmene){
        

        let noviDatumi=document.createElement("div");
        noviDatumi.classList.add("noviDatumi");

        let noviDatumPLbl=document.createElement("label");
        noviDatumPLbl.innerHTML="Novi datum preuzimanja: ";
        noviDatumi.appendChild(noviDatumPLbl);

        let noviDatumPInput=document.createElement("input");
        noviDatumPInput.type='date';
        noviDatumi.appendChild(noviDatumPInput);

        let noviDatumVLbl=document.createElement("label");
        noviDatumVLbl.innerHTML="Novi datum vraćanja: ";
        noviDatumi.appendChild(noviDatumVLbl);

        let noviDatumVInput=document.createElement("input");
        noviDatumVInput.type='date';
        noviDatumi.appendChild(noviDatumVInput);

        divZaIzmene.appendChild(noviDatumi);

        let potvrdiIzmenu=document.createElement("button");
        potvrdiIzmenu.classList.add("potvrdiIzmenu");
        potvrdiIzmenu.innerHTML="Potvrdi podatke za izmenu";
        divZaIzmene.appendChild(potvrdiIzmenu);


        potvrdiIzmenu.addEventListener("click", ()=>{
                fetch("https://127.0.0.1:5001/Rezervacija/IzmeniRezervaciju?ID="+this.id+"&datumP="+noviDatumPInput.value+"&datumV="+noviDatumVInput.value,
            {
                method:"PUT"
            }
            ).then(rez=>{
                if (rez.status==200){

                    let glavni=document.querySelector(".glavni");

    
                    alert("Uspesno izmenjena rezervacija!");
                    let datP=new Date(noviDatumPInput.value);
                    let datV=new Date(noviDatumVInput.value);
                    let datumP=glavni.querySelector(".datumPreuz");
                    datumP.innerHTML="";
                    datumP.innerHTML="Datum preuzimanja: "+ datP.toDateString() +"<br>";
                    let datumV=glavni.querySelector(".datumVrac");
                    datumV.innerHTML="";
                    datumV.innerHTML="Datum vraćanja: " + datV.toDateString();

                    let dani=(datV.getTime() - datP.getTime())/(1000*3600*24);
                    let ukupnaCena=dani*this.ponuda.auto.cenaPoDanu + this.ponuda.auto.depozit;
                    let cenaIspisi=glavni.querySelector(".cenaRezervacije");
                    cenaIspisi.innerHTML="";
                    cenaIspisi.innerHTML="Ukupna cena je: " + ukupnaCena;
 

                        }
                        else{
                            alert("Greska pri izmeni rezervacije!");
                        }
                    })



        })
        


    

    }

    obrisi(rezervacija){
        fetch("https://127.0.0.1:5001/Rezervacija/ObrisiRezervaciju?ID="+this.id,
        {
            method:"DELETE"
        }
        ).then(rez=>{
            if (rez.status==200){
                //alert("Uspesno obrisana rezervacija!");
                while(rezervacija.firstChild){
                    rezervacija.removeChild(rezervacija.lastChild);
                }

                rezervacija.parentNode.removeChild(rezervacija);

            }
            else{
                alert("Greska pri brisanju rezervacije!");
            }
        })

    }
    
}