using System.ComponentModel.DataAnnotations;
using System;

namespace Models{

    public class Rezervacija{

        [Key]
        public int ID { get; set; }

        //[Required]
       // public int brojDana {get;set;}

        [Required]
        public string mestoPreuzimanja { get; set; }

        [Required]
        public string mestoPovratka {get; set; }

        [Required]
        public Klijent klijent { get; set; }

        [Required]
        public Ponuda ponuda { get; set; }

        [Required]
        public DateTime datumPreuzimanja { get; set; }

        [Required]
        public DateTime datumVracanja { get; set;}

        [Required]
        public int cena { 
            get;
                /*string brDana= (datumVracanja-datumPreuzimanja).TotalDays.ToString();
                int br=Int32.Parse(brDana);
                return ponuda.auto.cenaPoDanu * br + ponuda.auto.depozit; */
            
            set;
            
               /* value=ponuda.auto.cenaPoDanu*Int32.Parse((datumVracanja-datumPreuzimanja).TotalDays.ToString())+ponuda.auto.depozit;
           */ 
        }
    }
}