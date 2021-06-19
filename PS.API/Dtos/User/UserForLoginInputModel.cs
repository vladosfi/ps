using System.ComponentModel.DataAnnotations;

namespace PS.API.Dtos.User
{
    public class UserForLoginInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}