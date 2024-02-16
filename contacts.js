const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require("path")

const contactsPath = path.join(__dirname, "db/contacts.json" )

const listContacts = async () => {
  const text = await fs.readFile(contactsPath)
  return JSON.parse(text);
}

const getContactById = async (contactId) => {
  const contacts =  await listContacts()
  const result = contacts.find(el => el.id === contactId)
  return result || null
}

const deleteContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
        return null;
    }
    const [deletedContact] = contacts.splice(index, 1); 
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact; 
};

const addContact = async (data) => {
    const contacts =  await listContacts();
    const newContact = {
            id: nanoid(),
      ...data, 
    }
   contacts.push(newContact)
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
   return newContact
}

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact

}