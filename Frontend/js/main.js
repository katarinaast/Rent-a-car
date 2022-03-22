import { Automobil } from "./Automobil.js";
import { Firma } from "./Firma.js";
import { Ponuda } from "./Ponuda.js";
import { RentACar } from "./RentACar.js";

var listaFirmi=[];
fetch("https://127.0.0.1:5001/Firma/PreuzmiFirme")
.then(p=>{
    p.json().then(firme=>{
        firme.forEach(firma => {
            //console.log(firma);
            var f=new Firma(firma.id, firma.imeFirme, firma.adresa, firma.email, firma.kontaktTelefon);
            listaFirmi.push(f);
        });
        
        var rent=new RentACar(listaFirmi, listaAutomobila, listaPonuda);
        rent.crtaj(document.body);
        
    })
})

console.log(listaFirmi);

var listaAutomobila=[];
fetch("https://127.0.0.1:5001/Automobil/PreuzmiAutomobile")
.then(p=>{
    p.json().then(automobili=>{
        automobili.forEach(auto=>{
            var a=new Automobil(auto.id, auto.marka, auto.model, auto.godiste, auto.cenaPoDanu, auto.depozit);
            listaAutomobila.push(a);
        })
    })
})

console.log(listaAutomobila);

var listaPonuda=[];
fetch("https://127.0.0.1:5001/Ponuda/VratiPonude")
.then(p=>{
    p.json().then(ponude=>{
        ponude.forEach(ponuda=>{
            var p=new Ponuda(ponuda.id, ponuda.auto, ponuda.firma);
            listaPonuda.push(p);
        })
    })
})

console.log(listaPonuda);



