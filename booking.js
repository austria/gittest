const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  status: {
    type: Number,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  employee: [{
    id: {
      type: String,
      required: true
    },
    start_time: {
      type: Date,
      required: true
    },
    end_time: {
      type: Date,
      required: true
    },
    status: {
      type: Number,
      required: true,
      default : 0
    },
    checklist: [{
      task_id: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      completion_time:{
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
      }
    }],
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
   company_id:{
        type: String,
        required: true
      },
  
  choosen_date: {
    type: String,
    required: true
  }

});



const Booking = mongoose.model('bookings', userSchema);

function validateBooking(Booking) {

  const schema = {
    status: Joi.number(),
    schedule: Joi.string(),
    employee: Joi.array().items({
      id: Joi.string().min(3).max(50).required(),
      start_time: Joi.date(),
      end_time: Joi.date(),
      status: Joi.number()
    }),
    company_id: Joi.string(),
    choosen_date: Joi.string()
  };
  return Joi.validate(Booking, schema);
}



exports.Booking = Booking;
exports.validateBooking = validateBooking;