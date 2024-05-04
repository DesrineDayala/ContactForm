using ContactFormApp.ContactFormDTO;

namespace ContactFormApp.Interfaces
{
    public interface IContactForm
    {
        Task<List<ContactDTO>> GetContacts();
        Task<ContactDTO> GetContactById(int id);
        Task<ContactDTO> CreateContact(ContactDTO contactDTO);
        Task<bool> UpdateContact(int id, ContactDTO contactDTO);
        Task<bool> DeleteContact(int id);

    }
}
