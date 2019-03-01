const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();

// var cron = require('node-cron');
var kue = require('kue');
const queue = kue.createQueue();
const nodeMailer = require('./helpers/mailer');

const everyMinute = '* * * * *';

queue.process('email', function (job, done) {

  console.log('processing send-welcome-email job')
  console.log(job.data)

  nodeMailer(job.data.email, { header: job.data.title, main: job.data.template }, done);
});


// create express instance
const app = express();

// connect to monngose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hacktivoverflow', { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);

kue.app.listen(3001);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
