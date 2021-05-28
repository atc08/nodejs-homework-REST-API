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
} = require('./validation');

router.get('/', guard, getAllContacts);

router.get('/:contactId', guard, getByContactId);

router.post('/', guard, validateCreateContact, createContact);

router.patch('/:contactId', guard, validateUpdateContact, updateContactInfo);

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateStatusContact,
  updateContactStatus
);

router.delete('/:contactId', guard, deleteContact);

module.exports = router;
