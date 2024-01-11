const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const uniqueSuffix =
      file.filename + Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.' + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.split('/')[1].match(/^(png|jpeg|jpg)$/gi);

  isImage ? cb(null, true) : cb(new Error('Pls upload only images!'));
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
