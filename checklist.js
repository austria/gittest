const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  company: {
    type: String,
    required: true
  },
  tasks: [{
    task_name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    duration: {
      type: Number,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    ivr_phrase: {
      type: String,
      minlength: 1,
      maxlength: 50
    },

    status: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  }]
});

const CheckList = mongoose.model('checklist', userSchema);
function validateCheckList(role) {
  const tasks = Joi.object().keys({
    task_name: Joi.string().min(3).max(50).required(),
    duration: Joi.number(),
    ivr_phrase: Joi.string(),
    status: Joi.string().min(3).max(50).required()
  });
  const schema = {
    category: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(5).max(50).required(),
    company: Joi.string(),
    tasks: Joi.array().items(tasks)
  };

  return Joi.validate(role, schema);
}

exports.CheckList = CheckList;
exports.validateCheckList = validateCheckList;