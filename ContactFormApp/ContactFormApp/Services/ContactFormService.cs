using ContactFormApp.ContactFormDTO;
using ContactFormApp.Data;
using ContactFormApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ContactFormApp.Services
{
    public class ContactFormService : IContactForm
    {

        private readonly ApplicationDBContext _db;

        public ContactFormService(ApplicationDBContext db)
        {
            _db = db;
        }
        public async Task<List<ContactDTO>> GetContactsList()
        {
            var contactList = await _db.Contacts.ToListAsync();
            var result = contactList.Select(e => new ContactDTO()
            {
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                Address = e.Address,
                PhoneNumber = e.PhoneNumber,
                City = e.City,
                State = e.State,
                Country = e.Country,
                PostalCode = e.PostalCode,
            }).ToList();
            return result;
        }
    }
}
