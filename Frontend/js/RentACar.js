import { Firma } from "./Firma.js";
import { Ponuda } from "./Ponuda.js";
import { Automobil } from "./Automobil.js";
import { Rezervacija } from "./Rezervacija.js";


export class RentACar{

    constructor(listaFirmi, listaAutomobila, listaPonuda){
        this.listaFirmi=listaFirmi;
        this.listaAutomobila=listaAutomobila;
        this.listaPonuda=listaPonuda;
        this.container=null;
    }

    crtaj(host){

        this.container=document.createElement("div");
        this.container.className="glavni";
        host.appendChild(this.container);


        let contNaslov=document.createElement("div");
        contNaslov.classList.add("naslov");
        this.container.appendChild(contNaslov);

        this.crtajNaslov(contNaslov);

        let centriraj=document.createElement("div");
        centriraj.classList.add("centriraj");
        this.container.appendChild(centriraj);

        let contFirmaRezervacija=document.createElement("div");
        contFirmaRezervacija.classList.add("firmaRezervacija");
        centriraj.appendChild(contFirmaRezervacija);

        this.crtajFirmuRezervaciju(contFirmaRezervacija);

        let contFilter=document.createElement("div");
        contFilter.classList.add("filter");
        centriraj.appendChild(contFilter);

        this.crtajFilter(contFilter);

        let contPonude=document.createElement("div");
        contPonude.classList.add("ponude");
        this.container.appendChild(contPonude);

        //this.crtajPonudu(contPonude, pon);

        let contRezervacije=document.createElement("div");
        contRezervacije.classList.add("rezervacije");
        this.container.appendChild(contRezervacije);

        let contRezervisi=document.createElement("div");
        contRezervisi.classList.add("contRezervisi");
        this.container.appendChild(contRezervisi);

       

    


    }

    crtajNaslov(host){

        let infoDiv=document.createElement("div");
        infoDiv.classList.add("infoDiv");
        
        let imeDiv=document.createElement("div");
        imeDiv.classList.add("imeDiv");

        let ime = document.createElement("label");
        ime.classList.add("rentACar");
        ime.innerHTML="Rent A Car ";

        let prazanDiv=document.createElement("div");

        imeDiv.appendChild(ime);
        infoDiv.appendChild(prazanDiv);

        host.appendChild(imeDiv);
        host.appendChild(infoDiv);


    }

    crtajFirmuRezervaciju(host){

        let firmaDiv=document.createElement("div");
        firmaDiv.classList.add("firmaDiv");

        let firmaLblInput=document.createElement("div");
        firmaLblInput.classList.add("firmaLblInput");

        let labelaZaFirmu= document.createElement("label");
        labelaZaFirmu.classList.add("firmaLbl")
        labelaZaFirmu.innerHTML="Izaberite firmu: "
        firmaLblInput.appendChild(labelaZaFirmu);

        let selectFirmu = document.createElement("select");
        selectFirmu.className="selectFirmu";
        firmaLblInput.appendChild(selectFirmu);

        firmaDiv.appendChild(firmaLblInput);

        let opcija;
        opcija=document.createElement("option");
        opcija.innerHTML=" ";

        this.listaFirmi.forEach(p=>{
            opcija=document.createElement("option");
            opcija.innerHTML=p.imeFirme;
            opcija.value=p.id;
            selectFirmu.appendChild(opcija);
        })

        let izaberiFirmu=document.createElement("button");
        izaberiFirmu.classList.add("izaberiFirmuButton");
        izaberiFirmu.innerHTML="Izaberi";
        firmaDiv.appendChild(izaberiFirmu);

        host.appendChild(firmaDiv);
        
        

        izaberiFirmu.onclick=(ev)=>{

            let obrisiPrethodno=this.container.querySelector(".ponude");
            if(obrisiPrethodno!=null){
                while(obrisiPrethodno.firstChild){
                    obrisiPrethodno.removeChild(obrisiPrethodno.lastChild);
                }
            }
            let firma=this.container.querySelector(".selectFirmu");
            var firmaID=firma.options[firma.selectedIndex].value;

            let naziv=document.createElement("div");
            naziv.classList.add("nazivFirmeNaslovDiv");

            var firmaNaziv=firma.options[firma.selectedIndex].innerHTML;
            let firmaNazivLbl=document.createElement("label");
            firmaNazivLbl.innerHTML=firmaNaziv;
            naziv.appendChild(firmaNazivLbl);

            let informacije=document.createElement("div");
            informacije.classList.add("infoDiv2");

            let naslovDiv=this.container.querySelector(".infoDiv");
            naslovDiv.innerHTML="";
         

            naslovDiv.appendChild(naziv);
            naslovDiv.appendChild(informacije);
            


            let labAdresa=document.createElement("label");
            labAdresa.classList.add("adresaLbl");
            let labEmail=document.createElement("label");
            labEmail.classList.add("emailLbl");
            let labTelefon=document.createElement("label");
            labTelefon.classList.add("telefonLbl");

       
            labAdresa.innerHTML="Adresa firme: "+this.listaFirmi[firma.selectedIndex].adresa + "<br>";
            labEmail.innerHTML="Email: "+this.listaFirmi[firma.selectedIndex].email + "<br>";
            labTelefon.innerHTML="Kontakt telefon: "+this.listaFirmi[firma.selectedIndex].kontaktTelefon+"\n";
    

            informacije.appendChild(labAdresa);
            informacije.appendChild(labEmail);
            informacije.appendChild(labTelefon);

            

            this.ucitajPonudeZaFirmu(firmaID);
            this.filtrirajPoFirmi(firmaID);
        }
        
        let rezervacijaDiv=document.createElement("div");
        rezervacijaDiv.classList.add("rezervacijaDiv");

        let jmbgLblInput=document.createElement("div");
        jmbgLblInput.classList.add("jmbgLblInput");

        let labelaZaKlijenta=document.createElement("label");
        labelaZaKlijenta.classList.add("klijentLbl");
        labelaZaKlijenta.innerHTML="Unesite JMBG kako biste proverili svoje rezervacije: <br>";
        jmbgLblInput.appendChild(labelaZaKlijenta);

        let inputJMBG=document.createElement("input");
        inputJMBG.classList.add("jmbg");
        inputJMBG.innerHTML="JMBG je...";
        jmbgLblInput.appendChild(inputJMBG);

        rezervacijaDiv.appendChild(jmbgLblInput);
        
        let proveriRezervacije=document.createElement("button");
        proveriRezervacije.classList.add("proveriRezervacijeButton")
        proveriRezervacije.innerHTML="Proveri";
        rezervacijaDiv.appendChild(proveriRezervacije);

        host.appendChild(rezervacijaDiv);

        proveriRezervacije.addEventListener("click", ()=>this.proveri());

        
    }

    ucitajPonudeZaFirmu(firmaID){
        var listaPonudaPoFirmi=[];
        fetch("https://127.0.0.1:5001/Ponuda/VratiPonudePoFirmi?firma="+firmaID)
        .then(s=>{
            if(s.ok){
                s.json().then(pod=>{
                    pod.forEach(pod=>{
                        let pon=new Ponuda(pod.id, pod.auto, pod.firma);
                        //console.log(pon);
                        listaPonudaPoFirmi.push(pon);
                        //pon.crtajPonudu(this.container);
                    })
                })
            }
        })

        return listaPonudaPoFirmi;

    }

    crtajFilter(host){

        let karakteristike=document.createElement("div");
        karakteristike.classList.add("karakteristikeFilter");

        let markaModel = document.createElement("div");
        markaModel.classList.add("markaModel");
        karakteristike.appendChild(markaModel);

        let markaDiv=document.createElement("div");
        markaDiv.classList.add("markaDiv");

        let labelMarka=document.createElement("label");
        labelMarka.innerHTML="Izaberite marku automobila: ";
        labelMarka.classList.add("markaLbl");
        markaDiv.appendChild(labelMarka);

        let selectMarka=document.createElement("select");
        selectMarka.className="selMarka";
        selectMarka.innerHTML="";
        markaDiv.appendChild(selectMarka);

        markaModel.appendChild(markaDiv);

        let selectAll=document.createElement("option");
        selectAll.innerHTML="Izaberi sve marke";
        selectMarka.appendChild(selectAll);

        let modelDiv=document.createElement("div");
        modelDiv.classList.add("modelDiv");

        let labelModel=document.createElement("label");
        labelModel.innerHTML="Izaberite model automobila: ";
        labelModel.classList.add("modelLbl");
        modelDiv.appendChild(labelModel);

        let selectModel=document.createElement("select");
        selectModel.className="selModel";
        modelDiv.appendChild(selectModel);

        markaModel.appendChild(modelDiv)

        selectMarka.onchange=(ev)=>{
            
            while(selectModel.options.length>0){
                selectModel.remove(0);
            }

            let selectAll=document.createElement("option");
            selectAll.innerHTML="Izaberite sve modele";
            selectModel.appendChild(selectAll);

            fetch("https://127.0.0.1:5001/Automobil/PreuzmiModele?marka="+selectMarka.value)
            .then(p=>p.json())
            .then(p=>p.forEach(el=>{
                let opcija=document.createElement("option");
                opcija.innerHTML=el;
                opcija.value=el;
                selectModel.appendChild(opcija);
            }))

        }



        let cenaAuta=document.createElement("div");
        cenaAuta.classList.add("cena");
        karakteristike.appendChild(cenaAuta);

        let minCenaDiv=document.createElement("div");
        minCenaDiv.classList.add("minCenaDiv");

        let labelMinCena=document.createElement("label");
        labelMinCena.innerHTML="Unesite minimalnu cenu automobila po danu: ";
        labelMinCena.classList.add("minCenaLbl");
        minCenaDiv.appendChild(labelMinCena);

        let inputMinCena=document.createElement("input");
        inputMinCena.classList.add("input1");
        inputMinCena.type="number";
        inputMinCena.defaultValue=0;
        minCenaDiv.appendChild(inputMinCena);

        cenaAuta.appendChild(minCenaDiv);

        let maxCenaDiv=document.createElement("div");
        maxCenaDiv.classList.add("maxCenaDiv");

        let labelMaxCena=document.createElement("label");
        labelMaxCena.innerHTML="Unesite maksimalnu cenu automobila po danu: ";
        labelMaxCena.classList.add("maxCenaLbl");
        maxCenaDiv.appendChild(labelMaxCena);

        let inputMaxCena=document.createElement("input");
        inputMaxCena.className="input2";
        inputMaxCena.type="number";
        inputMaxCena.defaultValue=0;
        maxCenaDiv.appendChild(inputMaxCena);

        cenaAuta.appendChild(maxCenaDiv);


        let godisteAuta=document.createElement("div");
        godisteAuta.classList.add("god");
        karakteristike.appendChild(godisteAuta);

        let minGodDiv=document.createElement("div");
        minGodDiv.classList.add("minGodDiv");

        let labelMinGodiste=document.createElement("label");
        labelMinGodiste.innerHTML="Unesite minimalno godište automobila: ";
        labelMinGodiste.classList.add("minGodLbl");
        minGodDiv.appendChild(labelMinGodiste);

        let inputMinGodiste=document.createElement("input");
        inputMinGodiste.className="input3";
        inputMinGodiste.type="number";
        inputMinGodiste.defaultValue=0;
        minGodDiv.appendChild(inputMinGodiste);

        godisteAuta.append(minGodDiv);

        let maxGodDiv=document.createElement("div");
        maxGodDiv.classList.add("maxGodDiv");

        let labelMaxGodiste=document.createElement("label");
        labelMaxGodiste.innerHTML="Unesite maksimalno godište automobila: ";
        labelMaxGodiste.classList.add("maxGodLbl");
        maxGodDiv.appendChild(labelMaxGodiste);

        let inputMaxGodiste=document.createElement("input");
        inputMaxGodiste.className="input4";
        inputMaxGodiste.type="number";
        inputMaxGodiste.defaultValue=2022;
        maxGodDiv.appendChild(inputMaxGodiste);

        godisteAuta.appendChild(maxGodDiv);

        host.appendChild(karakteristike);

        let dugmeFilter=document.createElement("button");
        dugmeFilter.classList.add("filtrirajButton");
        dugmeFilter.innerHTML="Filtriraj";
        dugmeFilter.onclick=(ev)=>this.nadjiAutomobile();
        host.appendChild(dugmeFilter);


    }

   nadjiAutomobile(){

        let isprazniPonude=this.container.querySelector(".ponude");
        isprazniPonude.innerHTML="";
        let firma=this.container.querySelector(".selectFirmu");
        var firmaID=firma.options[firma.selectedIndex].value;

        //console.log(firmaID);

        let selMarka=this.container.querySelector(".selMarka");
        var selMarkaID=selMarka.options[selMarka.selectedIndex].value;

        //console.log(selMarkaID);

        let selModel=this.container.querySelector(".selModel");
        var selModelID=selModel.options[selModel.selectedIndex].value;

        //console.log(selModelID);

        var izvuci=[];
        var minCena=this.container.querySelector(".input1").value;
        var maxCena=this.container.querySelector(".input2").value;
        var minGod=this.container.querySelector(".input3").value;
        var maxGod=this.container.querySelector(".input4").value;

        let contPon=this.container.querySelector(".ponude");

        if(selMarkaID==="Izaberite sve marke" && selModelID==="Izaberite sve modele"){

           
            fetch("https://127.0.0.1:5001/Ponuda/Filter?idFirme="+firmaID+"&minCena="+minCena+"&maxCena="+maxCena
            +"&minGodiste="+minGod+"&maxGodiste="+maxGod,
            {
                method:"GET"
            }
            ).then(p=>{
                
                p.json().then(ponude=>{
                    if(ponude.length){
                    
                    ponude.forEach(p=>{
                        var pon=new Ponuda(p.id, p.auto, p.firma);
                        izvuci.push(pon);

                        //this.izvuciKarakteristike(pon);
                        pon.crtajPonudu(contPon);
                        //console.log(pon);

                    })

                    console.log(izvuci);
                   
                }

                else{
                    alert("nema ponuda za vracanje");
                }

                })
            

            })

           


        }

        else{
            
            if(selModelID=="Izaberite sve modele"){
          

            //var izvuci=[];
            fetch("https://127.0.0.1:5001/Ponuda/Filter?idFirme="+firmaID+"&marka=" + selMarkaID+"&minCena="+minCena+"&maxCena="+maxCena
            +"&minGodiste="+minGod+"&maxGodiste="+maxGod,
            {
                method:"GET"
            }
            ).then(p=>{
                p.json().then(ponude=>{
                    if(ponude.length){
                    ponude.forEach(p=>{
                        var pon=new Ponuda(p.id, p.auto, p.firma);
                        izvuci.push(pon);
                        pon.crtajPonudu(contPon);

                })
                if (Array.isArray(izvuci)&& izvuci.length===0){
                    alert("Nema nijednog automobila koji zadovoljavaju ove parametre!");
                }
            }
            else{
                alert("Nema automobila");
            }
            })
        
            })

            console.log(izvuci);
            }
            else{
                
                fetch("https://127.0.0.1:5001/Ponuda/Filter?idFirme="+firmaID+"&marka=" + selMarkaID+ "&model="+selModelID+"&minCena="+minCena+"&maxCena="+maxCena
            +"&minGodiste="+minGod+"&maxGodiste="+maxGod,
            {
                method:"GET"
            }
            ).then(p=>{
                p.json().then(ponude=>{
                    
                    if(ponude.length){
                    ponude.forEach(p=>{
                        var pon=new Ponuda(p.id, p.auto, p.firma);
                        izvuci.push(pon);
                        pon.crtajPonudu(contPon);

                })
            }
            else{
                alert("Nema automobila");
            }
                })
                

            })
            
                console.log(izvuci);

            }
           
        }
 

    }


    filtrirajPoFirmi(firmaID){
        var novaLista=[];
        this.listaPonuda.forEach(p=>{
            if(p.firma.id==firmaID)
                novaLista.push(p);
            
        })
        
            //console.log(novaLista);
        var listaMarki=[];
            novaLista.forEach(p=>{
                if(!listaMarki.includes(p.auto.marka))
                listaMarki.push(p.auto.marka);
            })
            


            let sel=this.container.querySelector(".selMarka");
            while(sel.lastChild)
                sel.removeChild(sel.lastChild);
            let opcija=document.createElement("option");
            opcija.innerHTML="Izaberite sve marke";
            sel.appendChild(opcija);
            listaMarki.forEach(p=>{
                let op=document.createElement("option");
                op.innerHTML=p;
                sel.appendChild(op);
            })

            let selM=this.container.querySelector(".selModel");

            let opcijaa=document.createElement("option");
            opcijaa.innerHTML="Izaberite sve modele";
            selM.appendChild(opcijaa);

            sel.onchange=(ev)=>{
            while(selM.lastChild)
                selM.removeChild(selM.lastChild);
            let opcijaa=document.createElement("option");
            opcijaa.innerHTML="Izaberite sve modele";
            selM.appendChild(opcijaa);
            var listaModela=[];
            console.log(listaModela);
            novaLista.forEach(p=>{
                if(p.auto.marka==listaMarki[sel.selectedIndex-1])
                    listaModela.push(p);
            })

            listaModela.forEach(p=>{
                let op=document.createElement("option");
                op.innerHTML=p.auto.model;
                selM.appendChild(op);

            })

            }

        
    }

    proveri(){

        let isprazniPonude=this.container.querySelector(".ponude");
        isprazniPonude.innerHTML="";

        let jmbg=this.container.querySelector(".jmbg").value;
        let contRez=this.container.querySelector(".rezervacije");

        let nizRezervacija=[];
        
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
}
    

    
            