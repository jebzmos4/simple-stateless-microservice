/**
 * Created by Morifeoluwa Jebutu on 06/09/2018.
 * objective: building to scale
 */
const morgan = require('morgan');
const config = require('../config/settings');
const serviceFinder = require('../lib/service_locator');
const UserService = require('../services/user');
const UserController = require('../controllers/user');

const winston = require('winston');
require('winston-daily-rotate-file');

/**
 * Returns an instance of logger for the App
 */
serviceFinder.register('logger', () => {
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
serviceFinder.register('requestlogger', () => morgan('common'));


/**
 * Creates an instance of the User Service
 */
serviceFinder.register('userService', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  return new UserService(logger);
});

/**
 * Creates an instance of the User controller
 */
serviceFinder.register('userController', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const userService = serviceLocator.get('userService');
  return new UserController(logger, userService);
});


module.exports = serviceFinder;
