const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();
const imagesRoutes = require('./routes/images');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept , Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods',  'DELETE, POST, GET, OPTIONS');

  next();
});

app.use('/api/images', imagesRoutes);

app.use((req, res, next) => {
  const error = new Error('Could not find the requested route.');
  error.code = 404;
  return next(error);
});

// middleware that only executes if a request has an error attached to it
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
  .status(error.code || 500)
  .json({ message: error.message || 'An unkown error ocurred.'});
});

mongoose
  .connect(`mongodb+srv://pinit-user:${process.env.MONGO_ACCESS}@clusterpinit.docewiy.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)))
  .catch(err => console.log(err));
