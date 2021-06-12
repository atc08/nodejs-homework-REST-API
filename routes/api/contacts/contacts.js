const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getByContactId,
  createContact,
  updateContactInfo,
  updateContactStatus,
  deleteContact,
} = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateObjectId,
} = require('./validation');

router.get('/', guard, getAllContacts);

router.get('/:contactId', guard, validateObjectId, getByContactId);

router.post('/', guard, validateCreateContact, createContact);

router.patch(
  '/:contactId',
  guard,
  validateObjectId,
  validateUpdateContact,
  updateContactInfo
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateObjectId,
  validateUpdateStatusContact,
  updateContactStatus
);

router.delete('/:contactId', guard, validateObjectId, deleteContact);

module.exports = router;
