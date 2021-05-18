const Contact = require('./schema/contact');

const getContactsList = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    body,
    { new: true }
  );
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  return result;
};

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
