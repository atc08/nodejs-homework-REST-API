const db = require('./db');
const { ObjectId } = require('mongodb');

const getContacts = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const getContactsList = async () => {
  const collection = await getContacts(db, 'contacts');
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (contactId) => {
  const collection = await getContacts(db, 'contacts');
  const [result] = await collection
    .find({ _id: new ObjectId(contactId) })
    .toArray();
  return result;
};

const addContact = async (body) => {
  const collection = await getContacts(db, 'contacts');
  const newContact = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };
  const {
    ops: [result],
  } = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getContacts(db, 'contacts');
  const { value: updateContact } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(contactId),
    },
    { $set: body },
    { returnOriginal: false }
  );
  return updateContact;
};

const removeContact = async (contactId) => {
  const collection = await getContacts(db, 'contacts');
  const { value: delContact } = await collection.findOneAndDelete({
    _id: new ObjectId(contactId),
  });
  return delContact;
};

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await contactList();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     contacts[index] = { ...contacts[index], ...body };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     return contacts[index] ? contacts : null;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const updateStatusContact = async (contactId, body) => {
//   try {
//     const contacts = await contactList();
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     contacts[index] = { ...contacts[index], ...body, ...body.favorite };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     return contacts[index] ? contacts : null;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

module.exports = {
  getContactsList,

  getContactById,
  addContact,
  updateContact,
  // updateStatusContact,
  removeContact,
};
