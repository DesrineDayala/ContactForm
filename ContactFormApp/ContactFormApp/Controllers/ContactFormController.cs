using ContactFormApp.Interfaces;
using ContactFormApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactFormApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormController : Controller
    {
        private readonly IContactForm _contactForm;

        public ContactFormController(IContactForm contactForm) {
            _contactForm = contactForm;
        }
        public string Index()
        {
            var contactData = _contactForm.GetContactsList();
            return contactData.ToString();
        }
        
    }
}
