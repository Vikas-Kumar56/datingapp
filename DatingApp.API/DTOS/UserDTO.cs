using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOS
{
    public class UserDTO
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }
    }
}