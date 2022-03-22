using System.ComponentModel.DataAnnotations;

namespace Models{

    public class Klijent{

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string prezime { get; set; }

        [Required]
        [RegularExpression("^[0-9]*$")]
        [MaxLength(13)]
        [MinLength(13)]
        public string JMBG { get; set; }

        [Required]
        public string grad { get; set; }


        [Required]
        [RegularExpression("^[0-9]*$")]
        public string kontaktTelefon { get; set; }

        [Required]
        public string email { get; set; }
    }
}