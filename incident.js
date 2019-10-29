const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  
  company_id:{
    type: String,
    required:false
  },
  booking_id: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50
  },
  booking_doc_id: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50
  },
  incidents: [{
  question:{
    type: String,
    required:true
  },
  latitude:{
    type: String,
    required:true
  },
  longitude:{
    type: String,
    required:true
  },
  message:{
    type: String,
    required:true
  },
  date_time: {
    type: Date,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  
}]
  });
  const Incidents = mongoose.model('incidents', Schema);
  function validateIncident(role) {
    const incident = Joi.object().keys({
      question : Joi.string(),
      longitude : Joi.string(),
      latitude : Joi.string(),
      message : Joi.string(),
      date_time: Joi.date()
    });
    const schema = {
      company_id: Joi.string(),
      booking_id: Joi.string().min(3).max(50),
      booking_doc_id: Joi.string().min(3).max(50),
      incidents: incident,
    };
  
    return Joi.validate(role, schema);
  }
  
  exports.Incident = Incidents; 
  exports.validateIncident = validateIncident;
 