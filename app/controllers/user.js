/**
 * Created by Morifeoluwa on 30/05/2019.
 * objective: building to scale
 */

/**
 * Module Dependencies
 */

const uuid = require('uuid/v4');
const Response = require('../lib/response_manager');
const httpStatus = require('../constants/http_status');
const utils = require('../lib/utilities');

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
    this.logger.info('validating user CARD and PIN');
    const errors = utils.checkRequestBody(req.query, ['atmCard', 'pin']);
    if (errors) {
      return Response.failure(res, {
        message: 'Missing/Empty parameters in the request body',
        response: errors,
      }, httpStatus.BAD_REQUEST);
    }
    return this.service.login(req.query)
      .then((bankResponse) => {
        if (bankResponse.length === 0) {
          return Response.failure(res, {
            message: 'Login Failed',
            response: 'invalid card or pin',
          }, httpStatus.FORBIDDEN);
        }
        if (bankResponse[0].cardDetails === req.query.atmCard) {
          this.logger.info('login successful');
          const transactionToken = uuid();
          return Response.success(res, {
            message: 'Login Successful',
            response: [{ 'Transaction Token': transactionToken, 'Available Services': ['Withdrawal', 'Balance Enquiry', 'Change Pin', 'End Session'] }]
          }, httpStatus.ACCEPTED);
        }
        return Response.failure(res, {
          message: 'Login Failed',
          response: bankResponse,
        }, httpStatus.FORBIDDEN);
      }).catch(err => Response.failure(res, {
        message: 'Login Failed',
        response: `invalid card or pin ${err}`
      }, httpStatus.FORBIDDEN));
  }

  withdrawal(req, res) {
    this.logger.info('making cash withrawal request');
    const errors = utils.checkRequestBody(req.body, ['amount', 'denomination', 'transactionToken']);
    if (errors) {
      this.logger.error('required parameter not passed');
      return Response.failure(res, {
        message: 'required param not found',
        response: errors
      }, httpStatus.BAD_REQUEST);
    }
    const response = this.service.validateWithdrawal(req.body);
    if (response) {
      this.logger.info('withdrawal approved...dispensing in progress');
      return Response.success(res, {
        message: 'Withdrawal Approved',
        response: 'Dispensing in progress...'
      }, httpStatus.ACCEPTED);
    }
    return Response.failure(res, {
      message: 'Withdrawal declined',
      response
    }, httpStatus.NOT_ACCEPTABLE);
  }


  create(req, res) {
    this.logger.info('creating user data in Bank DB');
    const errors = utils.checkRequestBody(req.body, ['cardDetails', 'pin', 'amount']);
    if (errors) {
      this.logger.error('required parameter not passed');
      return Response.failure(res, {
        message: 'required param not found',
        response: errors
      }, httpStatus.BAD_REQUEST);
    }
    return this.service.create(req.body)
      .then((response) => {
        if (response.createdAt) {
          return Response.success(res, {
            message: 'User Data successfully created in Bank DB',
            response
          }, httpStatus.OK);
        }
        return Response.failure(res, {
          message: 'Error creating user data',
        }, httpStatus.BAD_REQUEST);
      })
      .catch(err => Response.failure(res, {
        message: 'required param not found',
        response: err
      }, httpStatus.BAD_REQUEST));
  }
}

module.exports = User;
