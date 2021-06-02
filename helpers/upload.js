const multer = require('multer');

require('dotenv').config();

const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
});

module.exports = upload;
