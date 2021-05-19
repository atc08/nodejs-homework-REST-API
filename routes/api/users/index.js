const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getByContactId,
  createContact,
  updateContactInfo,
  // updateContactStatus,
  deleteContact,
} = require('../../../controllers/users');
