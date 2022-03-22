using System.ComponentModel.DataAnnotations;

namespace Models{

    public class Automobil{

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(25)]
        public string marka { get; set; }

        [Required]
        [MaxLength(50)]
        public string model { get; set; }


        [Required]
        public string slika { get; set; }
        
        [Required]
        public int godiste { get; set; }

        [Required]

        public int cenaPoDanu { get; set; }

        [Required]
        public int depozit { get; set; }

    }
}