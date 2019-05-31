/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */
const validate = require('uuid-validate');
const MongoDBHelper = require('../lib/mongoDBHelper');
const UserModel = require('../models/user.model');


class User {
  /**
     *
     * @param {*} logger Logger Object
     */
  constructor(logger, mongoClient) {
    this.logger = logger;
    this.mongo = new MongoDBHelper(mongoClient, UserModel);
  }

  login(data) {
    if (data.atmCard && data.pin) {
      return this.mongo.fetchOne({ cardDetails: data.atmCard });
    }
    return false;
  }

  validateWithdrawal(data) {
    if (validate(data.transactionToken)) {
      this.logger.info('transaction token valid');
      return true;
    } else if (data.amount === '500' || data.amount === '1000') {
      this.logger.info('valid denomination passed');
      return true;
    }
    this.mongo.getOne();
    this.logger.info('Invalid transactionToken');
    return false;
  }

  create(data) {
    this.logger.info('inserting record into DB');
    return this.mongo.save(data);
  }
}

module.exports = User;
