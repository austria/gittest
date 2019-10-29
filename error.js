const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  date_time: {
    type: Date,
    required: true,
    minlength: 5,
    maxlength: 50
  }
  });
  const AppError = mongoose.model('error', Schema);
  function validateError(role) {
    const schema = {
      message: Joi.string().min(3).max(50).required(),
      date_time: Joi.string().min(3).max(50).required()
    };
  
    return Joi.validate(role, schema);
  }
  
  exports.AppError = AppError; 
  exports.validateError = validateError;
 