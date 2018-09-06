/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */

const routes = function routes(server, serviceLocator) {
  const userHandler = serviceLocator.get('userController');

  server.get({
    path: '/',
    name: 'base',
    version: '1.0.0'
  }, (req, res) => res.send('Welcome to HackerBay User Service API'));

  /**
   * LOGIN
   */
  server.post({
    path: '/login',
    name: 'authenticates a user',
  }, (req, res) => userHandler.login(req, res));

  /**
   * GET ALL USERS
   */
  server.post({
    path: '/image',
    name: 'Generates a thumbnail',
  }, (req, res) => userHandler.generateThumbnail(req, res));
};

module.exports = routes;
