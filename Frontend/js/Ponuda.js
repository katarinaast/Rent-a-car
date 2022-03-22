import { RentACar } from "./RentACar.js";
import { Rezervacija } from "./Rezervacija.js";

export class Ponuda{

    constructor(id, auto, firma){
        this.id=id;
        this.auto=auto;
        this.firma=firma;
        
    }

    crtajPonudu(host){


        let ponuda=document.createElement("div");
        ponuda.classList.add("ponudaDiv");


        let slika=document.createElement("img");
        slika.classList.add("slikaAuta");
        slika.src=this.auto.slika;

        let naziv =document.createElement("h4");
        naziv.classList.add("nazivPonude");
        //host.appendChild(naziv);

        let karakteristike=document.createElement("label");
        karakteristike.classList.add("karakteristikePonude");
        //host.appendChild(karakteristike);

        let cena=document.createElement("h4");
        cena.classList.add("cenaAuta");
        //host.appendChild(cena);

        let depozit=document.createElement("h6");
        depozit.classList.add("depozitAuta");

        let rezervisi=document.createElement("button");
        rezervisi.classList.add("rezervisiDugme");
        rezervisi.innerHTML="Rezerviši";
        //host.appendChild(rezervisi);

        rezervisi.addEventListener("click", ()=>{
            this.rezervisiButton(host);
        })
       
        

        naziv.innerHTML=this.auto.marka+" "+this.auto.model;
        karakteristike.innerHTML="Godište: " + this.auto.godiste;
        cena.innerHTML="Cena: " + this.auto.cenaPoDanu;
        depozit.innerHTML="Depozit: " + this.auto.depozit;

        ponuda.appendChild(slika);
        ponuda.appendChild(naziv);
        ponuda.appendChild(karakteristike);
        ponuda.appendChild(cena);
        ponuda.appendChild(depozit);
        ponuda.appendChild(rezervisi);

        host.appendChild(ponuda);
        

        
    }

    rezervisiButton(host){

        let glavni=document.querySelector(".glavni");


        let filter=glavni.querySelector(".filter");

        while(filter.firstChild){
            filter.removeChild(filter.lastChild);
        }
        filter.parentNode.removeChild(filter);

        let ponude=glavni.querySelector(".ponude");
        ponude.innerHTML="";

        
        let rezervisiCont=glavni.querySelector(".contRezervisi");

        let pitanje=document.createElement("div");
        pitanje.classList.add("pitanje");

        let postojeci=document.createElement("h3");
        postojeci.innerHTML="Da li ste postojeći korisnik?";
        pitanje.appendChild(postojeci);

        let daNeDugmici=document.createElement("div");
        daNeDugmici.classList.add("daNeDugmici");

        let da=document.createElement("button");
        da.classList.add("daButton");
        da.innerHTML="Da";
        daNeDugmici.appendChild(da);

        let ne=document.createElement("button");
        ne.classList.add("neButton");
        ne.innerHTML="Ne";
        daNeDugmici.appendChild(ne);

        pitanje.appendChild(daNeDugmici);
        rezervisiCont.appendChild(pitanje);

        let noviDiv=document.createElement("div");
        noviDiv.classList.add("noviDiv");
        host.appendChild(noviDiv);

        let noviDiv1=document.createElement("div");
        noviDiv1.classList.add("noviDiv1");
        host.appendChild(noviDiv1);
        

        da.addEventListener("click", ()=>this.postojeciKlijent(noviDiv));
        ne.addEventListener("click", ()=>this.noviKlijent(noviDiv1));

    }

    postojeciKlijent(host){

        let glavni=document.querySelector(".glavni");

        
        let posaljiRezervacijuDugme=document.createElement("button");
        posaljiRezervacijuDugme.classList.add("posaljiRezervacijuPostojeciButton");
        posaljiRezervacijuDugme.innerHTML="Posalji rezervaciju";


        let rezervisiCont=glavni.querySelector(".contRezervisi");
        rezervisiCont.innerHTML="";

        let postojeciKlijentDiv=document.createElement("div");
        postojeciKlijentDiv.classList.add("postojeciKlijentDiv");

        let jmbgLbl=document.createElement("label");
        jmbgLbl.innerHTML="Unesite svoj JMBG:";
        postojeciKlijentDiv.appendChild(jmbgLbl);

        let jmbgInput=document.createElement("input");
        jmbgInput.classList.add("jmbgInput1");
        postojeciKlijentDiv.appendChild(jmbgInput);

        let nekiDiv=document.createElement("div");
        host.appendChild(nekiDiv);

        host.appendChild(postojeciKlijentDiv);

        this.formaZaRezervaciju(postojeciKlijentDiv);

        postojeciKlijentDiv.appendChild(posaljiRezervacijuDugme);

        posaljiRezervacijuDugme.addEventListener("click", ()=>{

            let jmbg=jmbgInput.value;

            fetch("https://127.0.0.1:5001/Klijent/VratiKlijenta?JMBG="+jmbg)
            .then(p => {

                if(!p.ok) {

                    alert("Niste postojeci klijent! Popunite formu za registraciju!");

                }

                else {

                    var mestoP=postojeciKlijentDiv.querySelector(".selMestoP");
                    var mestoV=postojeciKlijentDiv.querySelector(".selMestoV");
                    var datumP=postojeciKlijentDiv.querySelector(".datumP");
                    var datumV=postojeciKlijentDiv.querySelector(".datumV");

                    

                            this.posaljiRezervaciju(jmbg, this.id, mestoP.options[mestoP.selectedIndex].value,
                                mestoV.options[mestoV.selectedIndex].value, datumP.value, datumV.value);
                        
                    

                }

            })
            

        })


    }

    noviKlijent(host){

        let posaljiRezervacijuDugme=document.createElement("button");
        posaljiRezervacijuDugme.classList.add("posaljiRezervacijuNoviButton");
        posaljiRezervacijuDugme.innerHTML="Pošalji rezervaciju";


        let rezervisiCont=document.querySelector(".contRezervisi");
        rezervisiCont.innerHTML="";

        let noviKlijentDiv=document.createElement("div");
        noviKlijentDiv.classList.add("noviKlijentDiv");

        let imeLbl=document.createElement("label");
        imeLbl.innerHTML="Unesite ime: ";
        noviKlijentDiv.appendChild(imeLbl);

        let imeInput=document.createElement("input");
        imeInput.classList.add("imeInput");
        noviKlijentDiv.appendChild(imeInput);

        let prezimeLbl=document.createElement("label");
        prezimeLbl.innerHTML="Unesite prezime: ";
        noviKlijentDiv.appendChild(prezimeLbl);

        let prezimeInput=document.createElement("input");
        prezimeInput.classList.add("prezimeInput");
        noviKlijentDiv.appendChild(prezimeInput);

        let jmbgLbl=document.createElement("label");
        jmbgLbl.innerHTML="Unesite svoj JMBG:";
        noviKlijentDiv.appendChild(jmbgLbl);

        let jmbgInput=document.createElement("input");
        jmbgInput.classList.add("jmbgInput2");
        noviKlijentDiv.appendChild(jmbgInput);

        let gradLbl=document.createElement("label");
        gradLbl.innerHTML="Unesite grad:";
        noviKlijentDiv.appendChild(gradLbl);

        let gradInput=document.createElement("input");
        gradInput.classList.add("gradInput");
        noviKlijentDiv.appendChild(gradInput);

        let kontaktTelefonLbl=document.createElement("label");
        kontaktTelefonLbl.innerHTML="Unesite kontakt telefon: ";
        noviKlijentDiv.appendChild(kontaktTelefonLbl);

        let kontaktTelefonInput=document.createElement("input");
        kontaktTelefonInput.classList.add("kontaktTelefonInput");
        noviKlijentDiv.appendChild(kontaktTelefonInput);

        let emailLbl=document.createElement("label");
        emailLbl.innerHTML="Unesite email:"
        noviKlijentDiv.appendChild(emailLbl);

        let emailInput=document.createElement("input");
        noviKlijentDiv.appendChild(emailInput);

        host.appendChild(noviKlijentDiv);
        this.formaZaRezervaciju(noviKlijentDiv);
        noviKlijentDiv.appendChild(posaljiRezervacijuDugme);


        posaljiRezervacijuDugme.addEventListener("click", ()=>{
            let jmbg=jmbgInput.value;

            fetch("https://127.0.0.1:5001/Klijent/VratiKlijenta?JMBG="+jmbg)
            .then(p => {

                if(p.ok) {

                    alert("Vec ste postojeci klijent!");

                }

                else {
            


                    fetch("https://127.0.0.1:5001/Klijent/DodajKlijenta?JMBG="+jmbg+"&ime="+imeInput.value+"&prezime="+prezimeInput.value+"&grad="+gradInput.value+"&kontaktTelefon="+kontaktTelefonInput.value+"&email="+emailInput.value,
                    {
                        method:"POST"
                        
                    }).then(p=>{
                        if(p.ok){
                            var mestoP=noviKlijentDiv.querySelector(".selMestoP");
                            var mestoV=noviKlijentDiv.querySelector(".selMestoV");
                            var datumP=noviKlijentDiv.querySelector(".datumP");
                            var datumV=noviKlijentDiv.querySelector(".datumV");
        
                            
        
                                    this.posaljiRezervaciju(jmbg, this.id, mestoP.options[mestoP.selectedIndex].value,
                                        mestoV.options[mestoV.selectedIndex].value, datumP.value, datumV.value);

                        }
                        else{
                        alert("Neuspešno dodavanje klijenta!");
                        }
                    })
                        
                        
                    


                   
                        
                    

                }

            })


            
        })

    }
   formaZaRezervaciju(host){

        let formaDiv=document.createElement("div");
        formaDiv.classList.add("formaDiv");

        let datumMestoDiv=document.createElement("div");
        datumMestoDiv.classList.add("datumMestoDiv");

        let autoDiv=document.createElement("div");
        autoDiv.classList.add("autoDiv");

        let automobilLbl=document.createElement("label");
        automobilLbl.innerHTML="Automobil: " + this.auto.marka + " " + this.auto.model;
        autoDiv.appendChild(automobilLbl);

        formaDiv.appendChild(autoDiv);

        let mestoPDiv=document.createElement("div");
        mestoPDiv.classList.add("mestoPDiv");

        let mestoPreuzimanjaLbl=document.createElement("label");
        mestoPreuzimanjaLbl.innerHTML="Mesto preuzimanja: ";
        mestoPDiv.appendChild(mestoPreuzimanjaLbl);

        let mestoPreuzimanjaSelect=document.createElement("select");
        mestoPreuzimanjaSelect.classList.add("selMestoP");
        mestoPreuzimanjaSelect.innerHTML="";
        mestoPDiv.appendChild(mestoPreuzimanjaSelect);

        datumMestoDiv.appendChild(mestoPDiv);

        let mesta=["Aerodrom Konstantin Veliki Niš", "Aerodrom Nikola Tesla Beograd", "Železnička stanica Niš", "Glavna autobuska stanica Beograd"];

        mesta.forEach(m=>{
            let opcija=document.createElement("option");
            opcija.innerHTML=m;
            mestoPreuzimanjaSelect.appendChild(opcija);
        
        })

        let mestoVDiv=document.createElement("div");
        mestoVDiv.classList.add("mestoVDiv");

        let mestoVracanjaLbl=document.createElement("label");
        mestoVracanjaLbl.innerHTML="Mesto vraćanja: ";
        mestoVDiv.appendChild(mestoVracanjaLbl);

        let mestoVracanjaSelect=document.createElement("select");
        mestoVracanjaSelect.classList.add("selMestoV");
        mestoVracanjaSelect.innerHTML="";
        mestoVDiv.appendChild(mestoVracanjaSelect);

        datumMestoDiv.appendChild(mestoVDiv);

        mesta.forEach(m=>{
            let opcija=document.createElement("option");
            opcija.innerHTML=m;
            mestoVracanjaSelect.appendChild(opcija);
        
        })


        let datumPDiv=document.createElement("div");
        datumPDiv.classList.add("datumPDiv");

        let datumPreuzimanjaLbl=document.createElement("label");
        datumPreuzimanjaLbl.innerHTML="Datum preuzimanja: ";
        datumPDiv.appendChild(datumPreuzimanjaLbl);

        let datumP=document.createElement("input");
        datumP.classList.add("datumP");
        datumP.type='date';
        datumPDiv.appendChild(datumP);

        datumMestoDiv.appendChild(datumPDiv);

        let datumVDiv=document.createElement("div");
        datumVDiv.classList.add("datumVDiv");

        let datumVracanjaLbl=document.createElement("label");
        datumVracanjaLbl.innerHTML="Datum vraćanja: ";
        datumVDiv.appendChild(datumVracanjaLbl);

        let datumV=document.createElement("input");
        datumV.classList.add("datumV");
        datumV.type='date';
        datumVDiv.appendChild(datumV);

        datumMestoDiv.appendChild(datumVDiv);

       formaDiv.appendChild(datumMestoDiv);

        host.appendChild(formaDiv);
       

    }

    posaljiRezervaciju(jmbg, id, mestoP, mestoV, datumP, datumV){

        console.log(jmbg);

        fetch("https://127.0.0.1:5001/Rezervacija/DodajRezervaciju?JMBG="+jmbg+"&IDponude="+id+"&datumP="+datumP+"&datumV="+datumV+"&mestoPreuzimanja="+mestoP+"&mestoVracanja="+mestoV,
        {
            method:"POST"
        }).then(p=>{
            if(!p.ok){
                alert("Nije dodata rezervacija");
            }
            else{

                let nizRezervacija=[];
                let contRez=document.querySelector(".rezervacije");

        
        fetch("https://127.0.0.1:5001/Rezervacija/VratiRezervacije?ID=-1&JMBG="+jmbg,
            {
                method:"GET"
            }
            ).then(p=>{
                
                p.json().then(rezervacije=>{
                    if(rezervacije.length){
                    
                    rezervacije.forEach(r=>{
                        var rez=new Rezervacija(r.id, r.mestoPreuzimanja, r.mestoPovratka, r.klijent, r.ponuda, r.datumPreuzimanja, r.datumVracanja, r.cena);
                        nizRezervacija.push(rez);
                        rez.crtajRezervacije(contRez);

                    })

                    console.log(nizRezervacija);
                   
                }

                else{
                    alert("nema ponuda za vracanje");
                }

    })
})
            }
        })
    


    }

    

      

 }
