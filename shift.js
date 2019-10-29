const Joi = require("joi");
const mongoose = require('mongoose');
const shiftSchema = new mongoose.Schema({
        shift_name:{
            type:String,
            required:true
        },
        start_date: {
          type: Date,
          default: null
        },
        end_date: {
          type: Date,
          default: null
        },
        start_time: {
          type: String,
          required: true
        },
        end_time: {
          type: String,
          required: true
        },
        company_id: {
          type: String,
          required: true
        },
        location_id: {
          type: String,
          required: true
        },
          description:{
            type:String,
            required: true
          },
          employee: [{
      
            beacon: [{
              rssi_value: {
                type: String,
                required: true
              },
              status: {
                type: String,
                required: true
              },
              date_time:{
                type:Date,
                required:true
              },
              latitude: {
                type: String,
                minlength: 3,
                maxlength: 356
              },
              longitude: {
                type: String,
                minlength: 3,
                maxlength: 356
              },
              mobile_battery: {
                type: String,
                minlength: 3,
                maxlength: 356
              },
              mobile_location: {
                type: String,
                minlength: 3,
                maxlength: 356
              },
              bluetooth_status: {
                type: String,
                default:"0"
              }
              
            }]
        
          }],
})
const Shift = mongoose.model('shifts', shiftSchema);
function validateShift(Shift) {
  const schema = {
    shift_name: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.date(),
    start_time: Joi.string(),
    end_time: Joi.string(),
    location_id: Joi.string(),
    company_id: Joi.string()
  };
  return Joi.validate(Shift, schema);
}
exports.Shift = Shift;
exports.validateShift = validateShift;
