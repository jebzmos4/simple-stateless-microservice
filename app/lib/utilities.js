const _ = require('lodash');

const Utility = {
  isValidQuery(query) {
    if (query.length < 1) return false;
    return query.replace(/[^\w\s]/gi, '');
  },
  checkRequestBody(params, requiredFields) {
    const errors = {};
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(params, requiredFields[i])) {
        errors[requiredFields[i]] = 'is required';
      }
    }
    if (_.isEmpty(errors)) {
      return null;
    }
    return errors;
  }


};

module.exports = Utility;
