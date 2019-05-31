/**
 * Created by Eshemogie Kassim(Jnr)
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const config = require('../config/settings');

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    cardDetails: {
      type: String,
      required: true
    },
    pin: {
      type: String,
      default: '0000',
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(config.mongo.collections.atm, UserSchema);
module.exports = userModel;
