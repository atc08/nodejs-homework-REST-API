const User = require('./schema/user');

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (token, body) => {
  return await User.updateOne({ token }, body, { new: true });
};

//           FOR LOCAL AVATAR
const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

//           FOR CLOUD AVATAR
// const updateAvatar = async (id, avatar, userIdImg = null) => {
//   return await User.updateOne({ _id: id }, { avatar, userIdImg });
// };

module.exports = {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
