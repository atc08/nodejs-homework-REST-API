const {
  getContactsList,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require('../model/index');
const { HttpCode } = require('../helpers/constants');

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contacts, total, limit, offset } = await getContactsList(
      userId,
      req.query
    );
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        total,
        limit,
        offset,
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getByContactId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactWithId = await getContactById(userId, req.params.contactId);
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
    const userId = req.user.id;
    const contact = await addContact({ ...req.body, owner: userId });
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
    const userId = req.user.id;
    const contactWithId = await updateContact(
      userId,
      req.params.contactId,
      req.body
    );
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

const updateContactStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactWithId = await updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contactWithId) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contactWithId });
    }
    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactWithId = await removeContact(userId, req.params.contactId);
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
  updateContactStatus,
  deleteContact,
};
