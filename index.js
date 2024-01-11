const express = require('express');
const path = require('path');
const upload = require('./utils/fileUpload');

const app = express();

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/upload-profile-pic', upload.single('user_dp'), (req, res) => {
  const { file } = req;
  console.log(file);
  console.log(req.body);

  if (!file) {
    return res.status(400).send('No file uploaded!');
  }

  res
    .status(200)
    .send(
      `<h2>Here is the picture:</h2><br/><img src="/uploads/${file.filename}" alt="profile pic"/>`
    );
});

app.post('/upload-multiple', upload.array('photos', 3), (req, res) => {
  console.log(req.files);
});

app.post(
  '/upload-all',
  upload.fields([
    { name: 'user_dp', maxCount: 1 },
    { name: 'photos', maxCount: 3 },
  ]),
  (req, res) => {
    console.log(req.files);
  }
);

app.listen(3000, () => {
  console.log('App is listening on port 3000!');
});
