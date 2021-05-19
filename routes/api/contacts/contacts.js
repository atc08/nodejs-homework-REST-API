const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getByContactId,
  createContact,
  updateContactInfo,
  // updateContactStatus,
  deleteContact,
} = require('../../../controllers/contacts');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('./validation');

router.get('/', getAllContacts);

router.get('/:contactId', getByContactId);

router.post('/', validateCreateContact, createContact);

router.patch('/:contactId', validateUpdateContact, updateContactInfo);

router.patch(
  '/:contactId/favorite',
  validateUpdateStatusContact,
  updateContactInfo
);

router.delete('/:contactId', deleteContact);

module.exports = router;
