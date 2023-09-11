const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");


/**
 * Get a list of contacts from a file and return it.
 * @author Yuliya Solovenuk
 * @returns {Array} array contacts
 */
async function listContacts() {
  try {
    const jsonContacts = await fs.readFile(contactsPath);
    const contacts = JSON.parse(jsonContacts);
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * Get contact by id and return contact or null.
 * @author Yuliya Solovenuk
 * @param {string} contact id
 * @returns {object} contact
 */
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);

    return contactById || null;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * Remove contact by id and return deleted contact or null.
 * @author Yuliya Solovenuk
 * @param {string} contact id
 * @returns {object} deleted contact
 */
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === String(contactId));

    if (index === -1) {
      return null;
    }

    const deletedContact = contacts.splice(index, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return deletedContact;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * Add contact by id and return added contact.
 * @author Yuliya Solovenuk
 * @param {string} contact id
 * @returns {object} added contact
 */
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: String(Date.now()),
      name,
      email,
      phone: String(phone),
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
