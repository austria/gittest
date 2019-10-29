const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  employee: [{
    id: {
      type: String,
      required: true
    },
    leave:[
      {
        type:String,
        required:false
      }
    ]
  }]
});



const ShiftBooking = mongoose.model('shift_bookings', userSchema);

function validateShiftBooking(ShiftBooking) {

  const schema = {
    status: Joi.boolean(),
    shift: Joi.string(),
    employee: Joi.array().items({
      id: Joi.string().min(3).max(50).required(),
    })
  };
  return Joi.validate(ShiftBooking, schema);
}



exports.ShiftBooking = ShiftBooking;
exports.validateShiftBooking = validateShiftBooking;
