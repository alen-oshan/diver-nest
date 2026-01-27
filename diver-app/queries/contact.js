import Contact from '@/lib/models/Contact.model'
import dbConnect from '@/lib/db/mongoose'

export async function createContact(contactDetails) {
    await dbConnect();
    try {
        await Contact.create(contactDetails);
    } catch(e) {
        console.log(e)
    }
}

export async function updateContactStatus(_id, status) {
    await dbConnect();
    try {
        await Contact.findByIdAndUpdate(
            _id,
            { status },
        );
    } catch (e) {
        console.error('Error updating contact status:', e);
        throw e;
    }
}

export async function findAllContacts() {
    await dbConnect();
    try {
        const contacts = await Contact.find().lean()
        const formattedContacts = contacts.map((contact) => ({
            ...contact,
            _id: contact._id.toString(),
        }));
        return formattedContacts;
    } catch (e) {
        console.error('Error updating contact status:', e);
        throw e;
    }
}