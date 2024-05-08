using ContactFormApp.ContactFormDTO;
using ContactFormApp.Data;
using ContactFormApp.Interfaces;
using ContactFormApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Metrics;
using System.Net;

namespace ContactFormApp.Services
{
    public class ContactFormService : IContactForm
    {

        private readonly ApplicationDBContext _db;

        public ContactFormService(ApplicationDBContext db)
        {
            _db = db;
        }

        public async Task<List<ContactDTO>> GetContacts()
        {
            return await _db.Contacts.OrderByDescending(x=> x.Id)
                    .Select(contact => new ContactDTO
                    {
                        Id = contact.Id,
                        FirstName = contact.FirstName,
                        LastName = contact.LastName,
                        Email = contact.Email,
                        PhoneNumber = contact.PhoneNumber,
                        Address = contact.Address,
                        City = contact.City,
                        State = contact.State,
                        Country = contact.Country,
                        PostalCode = contact.PostalCode,
                    })
                .ToListAsync();
        }
        public async Task<ContactDTO> GetContactById(int id)
        {
            var contact = await _db.Contacts.FindAsync(id);

            if (contact == null)
            {
                return null;
            }

            return new ContactDTO
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                Address = contact.Address,
                City = contact.City,
                State = contact.State,
                Country = contact.Country,
                PostalCode = contact.PostalCode,
            };
        }

        public async Task<ContactDTO> CreateContact(ContactDTO contact)
        {
            var contactlist = new Contact
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                Address = contact.Address,
                City = contact.City,
                State = contact.State,
                Country = contact.Country,
                PostalCode = contact.PostalCode,
            };

            _db.Contacts.Add(contactlist);
            await _db.SaveChangesAsync();

            contact.Id = contact.Id;
            return contact;
        }

        public async Task<bool> UpdateContact(int id, ContactDTO contactDTO)
        {
            if (id != contactDTO.Id)
            {
                return false;
            }

            var contact = await _db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }
            contact.Id= contactDTO.Id;
            contact.FirstName = contactDTO.FirstName;
            contact.LastName = contactDTO.LastName;
            contact.Email = contactDTO.Email;
            contact.PhoneNumber = contactDTO.PhoneNumber;
            contact.Address = contactDTO.Address;
            contact.City = contactDTO.City;
            contact.State = contactDTO.State;
            contact.Country = contactDTO.Country;
            contact.PostalCode = contactDTO.PostalCode;

            try
            {
                await _db.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteContact(int id)
        {
            var contact = await _db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }

            _db.Contacts.Remove(contact);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
