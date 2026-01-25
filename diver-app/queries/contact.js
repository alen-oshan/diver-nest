import Contact from '@/lib/models/Contact.model'

export async function createContact(contactDetails) {
    try {
        await Contact.create(contactDetails);
    } catch(e) {
        console.log(e)
    }
}