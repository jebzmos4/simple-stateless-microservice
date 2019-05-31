/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */

const dotenv = require('dotenv');

dotenv.config();

/**
 * Module Dependencies
 */
const config = require('./config/settings');
const restify = require('restify');
const restifyPlugins = require('restify').plugins;
const UserRoutes = require('./routes/index');
const corsMiddleware = require('restify-cors-middleware');

// service locator via dependency injection
const serviceLocator = require('./config/di');

const logger = serviceLocator.get('logger');
const requestLogger = serviceLocator.get('requestlogger');

/**
  * Initialize Server
  */
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*']
});
const server = restify.createServer({
  name: config.name,
  version: config.version,
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
server.pre(cors.preflight);
server.use(cors.actual);

// setup requests logging
server.use(requestLogger);

// setup Routing and Error Event Handling
UserRoutes(server, serviceLocator);

server.listen(6667, '127.0.0.1', () => {
  logger.info('%s listening on port %s', config.name, config.server.baseUrl);
});

module.exports = server;
