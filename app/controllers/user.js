/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */

/**
 * Module Dependencies
 */

const Response = require('../lib/response_manager');
const httpStatus = require('../constants/http_status');
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./auth');

class User {
/**
     * Constructor
     *
     * @param logger
     * @param service
     */
  constructor(logger, service) {
    // this.localStorage = new LocalStorage('./auth');
    this.logger = logger;
    this.service = service;
  }

  login(req, res) {
    this.logger.info('authenticating user');
    const data = req.params;
    const params = Object.keys(data);
    for (let i = 0; i < params.length; i += 1) {
      if (params[i] !== 'username' && params[i] !== 'password') {
        return Response.failure(res, {
          message: 'Invalid params passed! only *username* and *password* is allowed',
          res
        }, httpStatus.BAD_REQUEST);
      }
    }
    if (data.username && data.password) {
      return this.service.login(data)
        .then((response) => {
          localStorage.setItem('token', response);
          Response.success(res, {
            message: 'User successfully authenticated',
            response
          });
        })
        .catch(error => Response.failure(res, {
          message: error.msg,
          response: {},
        }, httpStatus.NOT_FOUND));
    } return Response.failure(res, {
      message: 'Please provide the username and password as a body param',
      response: {}
    }, httpStatus.UNAUTHORIZED);
  }

  generateThumbnail(req, res) {
    this.logger.info('Generating thumbnail');
    const token = localStorage.getItem('token');
    if (!token) {
      return Response.failure(res, {
        message: 'Unable to generate user token',
        res
      }, httpStatus.BAD_REQUEST);
    } else if (!req.query.url) {
      return Response.failure(res, {
        message: 'Please provide the url of the public image',
        res
      }, httpStatus.BAD_REQUEST);
    }
    const { url } = req.query;
    return this.service.generateThumbnail(token, url)
      .then(response => Response.success(res, {
        message: 'Fetched successfully',
        response
      }))
      .catch(error => Response.failure(res, {
        message: `An unknown error occured: ${error}`,
        response: {},
      }, httpStatus.NOT_FOUND));
  }
}

module.exports = User;
