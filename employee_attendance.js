const Joi = require('joi');
const mongoose = require('mongoose');
const r = Math.random().toString(36).substring(7);
const Schema = new mongoose.Schema({
	  uuid:{
        type: String, 
        required: true,
        default: "uuid"+r
    },
    employee: {
        type: String,
        required: true
    },
    booking: {
        type: String,
        required: true
    },
    schedule_id: {
        type: String,
        required: false
    },
    minor_checkin_checkout: [{
        minor_checkout: {
            type: Date,
            required: false
        },
        minor_checkin: {
            type: Date,
            required: false
        }
        
    }],
    main_radius_checkin: {
        type: Date,
        required: true
    },
    main_radius_checkout: {
        type: Date,
        required: false
    },
    actual_checkin: {
        type: Date,
        required: false
    },
    actual_checkout: {
        type: Date,
        required: false
    },
     company_id:{
        type: String,
        required: true
    },
     status: {
        type: Number,
          default: 0,
        required: true
    },
    date: {
            type: Date,
            required: true
        },
        sandata_record:[{
         sandata_response_id: {
      type: String,
    },
    status:{
      type: String, 
    },
    date:{ 
      type: Date, 
      default: Date.now
    },
    error_message:{
      type: String
    }
      }],
});
const Attendance = mongoose.model('employee_attendances', Schema);
function validateAttendance(attendance) {
    const schema = {
        employee: Joi.string(),
        booking: Joi.string(),
        schedule_id: Joi.string(),
        minor_checkin_checkout: Joi.array().items(Joi.object({
            minor_checkin: Joi.date(),
            minor_checkout: Joi.date(),
        })),
        main_radius_checkin: Joi.date(),
        main_radius_checkout: Joi.date().null(),
        actual_checkin: Joi.date().null(),
        actual_checkout: Joi.date().null(),
        date: Joi.date()
    }
    return Joi.validate(attendance, schema);
}
exports.Attendance = Attendance;
exports.validateAttendance = validateAttendance;