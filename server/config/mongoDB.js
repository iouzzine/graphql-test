// Config should be imported before importing any other file
const config = require('./config');

//require mongoose module
const mongoose = require('mongoose');

// make bluebird default Promise
const Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

//require chalk module to give colors to console text
const chalk = require('chalk');

//require database URL from properties file
const mongoUri = config.mongoDB;

// Color for Actions
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

// Export function
module.exports = () => {
  mongoose.connect(mongoUri, {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on('connected', () =>
    console.log(connected('Mongoose default connection is open to', mongoUri))
  );

  mongoose.connection.on('error', err =>
    console.log(error(`Mongoose default connection has occured ${err} error`))
  );

  mongoose.connection.on('disconnected', () =>
    console.log(disconnected('Mongoose default connection is disconnected'))
  );

  process.on('SIGINT', () =>
    mongoose.connection.close(() => {
      console.log(
        termination(
          'Mongoose default connection is disconnected due to application termination'
        )
      );
      process.exit(0);
    })
  );
};
