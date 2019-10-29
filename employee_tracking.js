const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    employee_id:{
        type: String,
        required: true
    },
    booking_id: {
        type: String,
        required: true
    },
    booking_id_arr: {
        type: String,
        required: false
    },
    status:{
        type: Number,
        minlength: 1,
        maxlength: 1  
    },
    map_line_status:{
        type: Number,
        default:0,
        minlength: 1,
        maxlength: 1  
    },
    tracking: [{
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        track_time: {
            type: Date,
            required: true
        }
    }]
});
const employee_tracking = mongoose.model('employee_tracking', userSchema);
function validateEmpTracking(emp_track) {
    let schema = {
        booking_id: Joi.string(),
        booking_id_arr: Joi.string(),
        employee_id: Joi.string(),
        status: Joi.number(),
        map_line_status: Joi.number(),
        tracking: Joi.object().keys({
            latitude: Joi.string().min(3).max(50).required(),
            longitude: Joi.string().min(3).max(50).required(),
            track_time: Joi.date()
        })
    };
    return Joi.validate(emp_track, schema);
}
exports.EmployeeTracking = employee_tracking;
exports.validateEmpTracking = validateEmpTracking;