const {
  getContactsList,
  getContactById,
  addContact,
  updateContact,
  // updateStatusContact,
  removeContact,
} = require('../model/index');
const { HttpCode } = require('../helpers/constants');

const getAllContacts = async (req, res, next) => {
  try {
    console.log(req.user);
    const contacts = await getContactsList();
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getByContactId = async (req, res, next) => {
  try {
    const contactWithId = await getContactById(req.params.contactId);
    if (contactWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contactWithId },
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = HttpCode.BAD_REQUEST;
    }
    next(err);
  }
};

const updateContactInfo = async (req, res, next) => {
  try {
    const contactWithId = await updateContact(req.params.contactId, req.body);
    if (contactWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contactWithId },
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

// const updateContactStatus = async (req, res, next) => {
//   try {
//     const contactWithId = await updateStatusContact(
//       req.params.contactId,
//       req.body
//     );
//     if (contactWithId) {
//       return res
//         .status(HttpCode.OK)
//         .json({ status: 'success', code: HttpCode.OK, data: contactWithId });
//     }
//     return res
//       .status(HttpCode.NOT_FOUND)
//       .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
//   } catch (err) {
//     next(err);
//   }
// };

const deleteContact = async (req, res, next) => {
  try {
    const contactWithId = await removeContact(req.params.contactId);
    if (contactWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contactWithId },
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContacts,
  getByContactId,
  createContact,
  updateContactInfo,
  // updateContactStatus,
  deleteContact,
};
