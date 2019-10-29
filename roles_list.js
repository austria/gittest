const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({  
  role_name:{
    type: String,
    required: true,
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
  const RoleList = mongoose.model('roles_list', userSchema);
  function validateRoleList(role) {
    const schema = {
      role_name: Joi.string().min(1).max(50).required(),
      company_id:Joi.string(),
    };
  
    return Joi.validate(role, schema);
  }
  
  exports.RoleList = RoleList; 
  exports.validateRoleList = validateRoleList;
 