using ContactFormApp.ContactFormDTO;
using ContactFormApp.Interfaces;
using ContactFormApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactFormApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormController : Controller
    {
        private readonly IContactForm _contactService;

        public ContactFormController(IContactForm contactForm)
        {
            _contactService = contactForm;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDTO>>> GetContacts()
        {
            var contacts =await _contactService.GetContacts();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDTO>> GetContactById(int id)
        {
            var contact = await _contactService.GetContactById(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<ContactDTO>> CreateNewContact(ContactDTO contactDTO)
        {
            var createdContact = await _contactService.CreateContact(contactDTO);
            return CreatedAtAction(nameof(GetContacts), new { id = createdContact.Id }, createdContact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatingContact(int id, ContactDTO contactDTO)
        {
            if (id != contactDTO.Id)
            {
                return BadRequest();
            }

            var result = await _contactService.UpdateContact(id, contactDTO);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var result = await _contactService.DeleteContact(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}
