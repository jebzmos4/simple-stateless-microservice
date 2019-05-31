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
  }, (req, res) => res.send('Welcome to the Gokada ATM Service API'));

  /**
   * LOGIN
   */
  server.post({
    path: '/login',
    name: 'authenticates a user',
  }, (req, res) => userHandler.login(req, res));

  /**
   * MAKE A WITHDRWAL
   */
  server.post({
    path: '/withdrawal',
    name: 'Make Withdrawals',
  }, (req, res) => userHandler.withdrawal(req, res));

  /**
   * CREATE USER DATA
   */
  server.post({
    path: '/create',
    name: 'Create user dara',
  }, (req, res) => userHandler.create(req, res));
};

module.exports = routes;
