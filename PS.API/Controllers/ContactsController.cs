using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PS.API.Data.Common.Interfaces;
using PS.API.Dtos.Common;
using PS.API.Dtos.Contact;
using PS.API.Helpers;
using PS.API.Helpers.Messaging;

namespace PS.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IEmailSender emailSender;
        private readonly IRepository<ContactFormEntry> contactsRepository;

        public ContactsController(
            IEmailSender emailSender,
            IRepository<ContactFormEntry> contactsRepository)
        {
            this.emailSender = emailSender;
            this.contactsRepository = contactsRepository;
        }
        
        //[HttpPost("{token}")]
        [HttpPost]
        public async Task<IActionResult> Recaptcha([FromBody]ContactsInputModel input)
        {
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();
            var contactFormEntry = new ContactFormEntry
            {
                Name = input.FromName,
                Email = input.SendersEmail,
                Title = input.Subject,
                Content = input.Content,
                Ip = ip,
            };

            await this.contactsRepository.AddAsync(contactFormEntry);
            await this.contactsRepository.SaveChangesAsync();

            await this.emailSender.SendEmailAsync(
                GlobalConstants.SystemSenderMail,
                input.FromName,
                input.SendersEmail,
                input.Subject,
                input.Content);

            // this.TempData["Success"] = true;

            // return this.RedirectToAction(nameof(this.Index));

            return Ok();
        }
    }
}