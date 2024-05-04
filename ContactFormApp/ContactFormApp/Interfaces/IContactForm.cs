using ContactFormApp.ContactFormDTO;

namespace ContactFormApp.Interfaces
{
    public interface IContactForm
    {
        Task<List<ContactDTO>> GetContactsList();

    }
}
