// require('./config/passport-config.js');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const coastsRouter = require('./routers/coasts-router');
const incomesRouter = require('./routers/incomes-router');
// const authRouter = require('./routers/auth-router');
// const regRouther = require('./routers/registr-router');

const cors = require('cors');
// const passport = require('passport');

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

// app.use(passport.initialize());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/records', coastsRouter);
app.use('/incomes', incomesRouter);
// app.use('/authenticate', authRouter);
// app.use('/register', regRouther);

app.use((req, res) => {
  res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'));
});
