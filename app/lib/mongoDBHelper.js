/* eslint-disable radix */
/* eslint-disable no-shadow */
/**
 * Created by Morifeoluwa Jebutu
 * objective: building to scale
 */

const config = require('../config/settings');

class MongoDBHelper {
  /**
   * The constructor
   *
   * @param mongodbClient - MongoDB client
   * @param mongodbModel - the model you wish to operate on
   */
  constructor(mongodbClient, mongodbModel) {
    this.mongodbClient = mongodbClient;
    this.mongodbModel = mongodbModel;
  }


  /**
   * Saves data into the MongoDB instance
   *
   * @param data
   * @returns {Promise}
   */
  save(data) {
    return new Promise((resolve, reject) => {
      const mongodbSaveSchema = this.mongodbModel(data);
      return mongodbSaveSchema.save((error, result) => {
        if (error != null) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(result);
      });
    });
  }


  /**
   * Updates a SINGLE RECORD in the MongoDB instance's DB based on some conditional criteria
   *
   * @param params - the conditional parameters
   * @param data - the data to update
   * @returns {Promise}
   */
  update(params, data) {
    return new Promise((resolve, reject) => this.mongodbModel.findOneAndUpdate(
      params.conditions,
      { $set: data },
      { new: true },
      (error, response) => {
        if (error) {
          if (config.logging.console) {
            return new Error(`Update Error: ${JSON.stringify(error)}`);
          }
          return reject(MongoDBHelper.handleError(error));
        }
        if (error == null && response == null) {
          return reject(new Error("Record Not Found In DB'"));
        }
        return resolve(response);
      }
    ));
  }
  // new test
  getOne(data) {
    return new Promise((resolve, reject) => {
      this.mongodbModel.find(data)
        .then(data => resolve(data))
        .catch(err => reject(MongoDBHelper.handleError(err)));
    });
  }

  fetchOne(data) {
    return new Promise((resolve, reject) => {
      this.mongodbModel.find(data)
        .then(response => resolve(response))
        .catch(err => reject(MongoDBHelper.handleError(err)));
    });
  }


  // get one and update
  getOneAndUpdate(param, data) {
    return new Promise((resolve, reject) => {
      this.mongodbModel.findOneAndUpdate(param, { $set: data }, { new: true })
        .then(resp => resolve(resp))
        .catch(err => reject(MongoDBHelper.handleError(err)));
    });
  }

  /**
   * Used to format the error messages returned from the MongoDB server during CRUD operations
   *
   * @param report
   * @returns {{error: boolean, message: *}}
   */
  static handleError(report) {
    return { error: true, msg: report };
  }
}

module.exports = MongoDBHelper;
