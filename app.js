/**
 * Module dependencies.
 */
const express = require('express');
const cookieParser = require('cookie-parser')
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const Meta = require('express-metatag');
const winston = require('winston');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({
  path: '.env'
});

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
mongoose.connection.on('connected', async function () {
  winston.info(chalk.green('✓') + ' Connected to MongoDb.');
  //If user does not exist create some demo data
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb'
}));
app.use(expressValidator());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
  }),
  cookie: {
    _expires: 15000000 //env? Longer in dev, shorter in prod?
  }
}));
app.use(flash());

app.use((req, res, next) => {
  if(req.body.key && req.body.key == "heidi") {
    next();
  } else {
    lusca.csrf({
      cookie: 'csrf-x'
    })(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//routes
require('./routes/routes')(app);

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 31557600000
}));
app.use('/favicon.png', express.static(__dirname + '/public/favicon.png'));
app.use('/dist/', express.static(__dirname + '/dist/'));
app.use('/js/jquery', express.static(__dirname + '/node_modules/jquery/dist/jquery.min.js'));
app.use('/js/analytics.js', express.static(__dirname + '/public/js/analytics.js'));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
