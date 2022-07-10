const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log('db connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/images/:id', (req, res) => {
  res.sendFile(__dirname + `/routes/images/${req.params.id}`);
});

app.get('/profilephoto/:id', (req, res) => {
  res.sendFile(__dirname + `/routes/profilephoto/${req.params.id}`);
});

app.use('/', UserRoutes);

module.exports = app;
