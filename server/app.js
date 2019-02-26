const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();

// create express instance
const app = express();

// connect to monngose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hacktivoverflow', { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));