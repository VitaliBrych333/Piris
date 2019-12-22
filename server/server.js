const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const recordsRouter = require('./routers/records-router');

const cors = require('cors');

mongoose.connect(
  'mongodb://admin:admin2019@ds353738.mlab.com:53738/piris',
  { useNewUrlParser: true, useFindAndModify: true},
);

const app = express();

app.set('port', (process.env.PORT || 5500));

app.use(express.static(path.join(__dirname, '../src')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use('/records', recordsRouter);

app.use((req, res) => {
  res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'));
});
