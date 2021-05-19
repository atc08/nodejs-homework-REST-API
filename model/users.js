const User = require('./schema/user');

const findById = async (contactId) => {
  return await User.findOne({ _id: contactId });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (contactId, token) => {
  return await User.updateOne({ _id: contactId }, { token });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
};
