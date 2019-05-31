/**
 * Created by Morifeoluwa Jebutu on 30/05/2019.
 * objective: building to scale
 */
const morgan = require('morgan');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('../config/settings');
const serviceLocator = require('../lib/service_locator');
const UserService = require('../services/user');
const UserController = require('../controllers/user');

const winston = require('winston');
require('winston-daily-rotate-file');

mongoose.Promise = bluebird;

/**
 * Returns an instance of logger for the App
 */
serviceLocator.register('logger', () => {
  const fileTransport = new (winston.transports.DailyRotateFile)({
    filename: `${config.file}terragon_em_app.log`,
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
  });

  const consoleTransport = new (winston.transports.Console)({
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    json: false,
    colorize: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
  });
  return new (winston.Logger)({
    transports: [
      fileTransport,
      consoleTransport,
    ],
  });
});


/**
 * Returns an instance of HTTP requests logger
 */
serviceLocator.register('requestlogger', () => morgan('common'));


/**
 * Returns a Mongo connection instance.
 */

serviceLocator.register('mongo', () => {
  const connectionString =
    (!config.mongo.connection.username || !config.mongo.connection.password) ?
      `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}` :
      `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}` +
      `@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}`;
  mongoose.Promise = bluebird;
  const mongo = mongoose.connect(connectionString, { useNewUrlParser: true });
  mongo.then(() => {
    console.log('Mongo Connection Established', connectionString);
  }).catch(() => {
    console.log('Mongo Connection disconnected');
    process.exit(1);
  });

  return mongo;
});


/**
 * Creates an instance of the User Service
 */
serviceLocator.register('userService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoClient = servicelocator.get('mongo');
  return new UserService(logger, mongoClient);
});

/**
 * Creates an instance of the User controller
 */
serviceLocator.register('userController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const userService = servicelocator.get('userService');
  return new UserController(logger, userService);
});


module.exports = serviceLocator;
