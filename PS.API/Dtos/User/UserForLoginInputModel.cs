using PS.API.Dtos.Contact;

namespace PS.API.Dtos.User
{
    public class UserForLoginInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        [GoogleReCaptchaValidation]
        public string RecaptchaValue { get; set; }
    }
}