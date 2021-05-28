const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  currentUser,
  userSubscription,
} = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);
router.patch('/', guard, userSubscription);

module.exports = router;
