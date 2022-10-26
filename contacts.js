const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require("nanoid");

const contactPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
      const contactsList = await fs.readFile(contactPath);
      return JSON.parse(contactsList);
  } catch (error) {
    console.error(error);
  }
}

const getContactById = async (contactId) =>{
  try {
      const contactsList = await listContacts();
      const contactsListFilterById = contactsList.filter(({ id }) => id === contactId);
      return contactsListFilterById;
  } catch (error) {
    console.error(error);
  }
}

const removeContact = async (contactId) => {
  try {
      const contactsList = await listContacts();
      const contactById = await getContactById(contactId);
      const updateContactsList = contactsList.filter(({ id }) => id !== contactId);
      await fs.writeFile(contactPath, JSON.stringify(updateContactsList))
      return contactById;
  } catch (error) {
    console.error(error);
  }
}

const addContact = async (name, email, phone) => {
    try {
        const contactsList = await listContacts();
        const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
        }
        const addNewContact = [newContact, ...contactsList];
        await fs.writeFile(contactPath, JSON.stringify(addNewContact));
        return newContact;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}