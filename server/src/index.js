const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const multipartMiddleware = multipart({ uploadDir: './uploads', keepExtensions: true });

app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message : files });
})

app.use((err, req, res, next) => res.json({error : err.message}))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
