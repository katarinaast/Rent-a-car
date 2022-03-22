using System.ComponentModel.DataAnnotations;

namespace Models{

    public class Ponuda{


        [Key]
        public int ID { get; set; }

        [Required]
        public Automobil auto { get; set; }

        //[Required]
        //public int cena { get; set; }

        [Required]
        public Firma firma { get; set; }
    }
}