using ContactFormApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactFormApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormController : Controller
    {
        private readonly ContactFormService _contactFormService;

        public ContactFormController(ContactFormService contactFormService)
        {
            _contactFormService = contactFormService;
        }
        public string Index()
        {
            return "Hi";
        }
        
    }
}
