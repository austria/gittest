const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({  
  name:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50

  },
  description:{
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50
  },
  note:{
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50
  },
  company_id:{
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50
  }
});
  const Program = mongoose.model('programs', userSchema);
  function validateProgram(role) {
    const schema = {
      name: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).max(50).required(),
      note: Joi.string().min(1).max(50).required(),
      company_id:Joi.string(),
    };
  
    return Joi.validate(role, schema);
  }
  
  exports.Program = Program; 
  exports.validateProgram = validateProgram;
 