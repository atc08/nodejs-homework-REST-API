const jwt = require('jsonwebtoken');
// const cloudinary = require('cloudinary').v2; // for CLOUD AVATAR
// const { promisify } = require('util'); // for CLOUD AVATAR

require('dotenv').config();

const {
  findByEmail,
  findByToken,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
} = require('../model/users');
const { HttpCode } = require('../helpers/constants');
const UploadAvatar = require('../services/upload-avatars-local');
// const UploadAvatar = require('../services/upload-avatar-cloud');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS; // comment for CLOUD AVATAR

//             FOR CLOUD AVATAR
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

const signup = async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      });
    }
    const newUser = await create(req.body);
    const { id, name, email, subscription, avatar } = newUser;
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id,
        name,
        email,
        subscription,
        avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, _next) => {
  await updateToken(req.user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const userToken = req.user.token;
    const { name, email, subscription } = req.user;
    const curUser = await findByToken(userToken);
    if (curUser) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          name,
          email,
          subscription,
        },
      });
    }
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  } catch (err) {
    next(err);
  }
};

const userSubscription = async (req, res, next) => {
  try {
    const userToken = req.user.token;
    const { name, email, subscription, avatar } = req.user;
    const userSubscr = await updateSubscription(userToken, req.body);
    if (userSubscr) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          name,
          email,
          subscription,
          avatar,
        },
      });
    }
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  } catch (err) {
    next(err);
  }
};

const avatars = async (req, res, next) => {
  try {
    //           FOR LOCAL AVATAR
    const id = req.user.id;

    const uploads = new UploadAvatar(AVATAR_OF_USERS);

    const avatarUrl = await uploads.saveAvatarToStatic({
      idUser: id,
      pathFile: req.file.path,
      name: req.file.filename,
      oldFile: req.user.avatar,
    });

    //             FOR CLOUD AVATAR
    // const id = req.user.id;
    // const uploadCloud = promisify(cloudinary.uploader.upload);
    // const uploads = new UploadAvatar(uploadCloud);
    // const { userIdImg, avatarUrl } = await uploads.saveAvatarToCloud(
    //   req.file.path,
    //   req.user.userIdImg
    // );
    // await updateAvatar(id, avatarUrl, userIdImg);
    //

    await updateAvatar(id, avatarUrl); // FOR LOCAL AVATAR
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  userSubscription,
  avatars,
};
