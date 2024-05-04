using ContactFormApp.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace ContactFormApp.Controllers
{
    public class ContactFormController : Controller
    {
        private readonly ApplicationDBContext _db;

        public ContactFormController(ApplicationDBContext db)
        {
            _db = db;
        }
        public string Index()
        {
            var formList = _db.Contacts.ToList();
            return formList.ToString();
        }
        public string Welcome(string name, int numTimes = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
        }
    }
}
