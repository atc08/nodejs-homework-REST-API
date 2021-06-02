const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  currentUser,
  userSubscription,
  avatars,
} = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateUserSubscription,
} = require('./validation');

router.post('/signup', validateSignupUser, signup);
router.post('/login', validateLoginUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);
router.patch('/', guard, validateUpdateUserSubscription, userSubscription);
router.patch('/avatar', [guard, upload.single('avatar')], avatars);

module.exports = router;
