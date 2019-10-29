const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
    status: {
      type: Boolean,
      required: true
    },
    start_time: {
      type: Date,
      //required: true
    },
    end_time: {
      type: Date,
     // required: true
    },
    start_date: {
      type: Date,
      //required: true
    },
    end_date: {
      type: Date,
     // required: true
    },
    availibilty:[{
      day:{
        type: String
      },
      start_time: {
        type: Date,
        //required: true
      },
      end_time: {
        type: Date,
       // required: true
      }
    }],
      reason: {
        type: String,
      },
      type: {
        type: String,
      },
      
      repeat: {
        once:{
          type: String,
        },
        daily:{
            frequency:{
              type: Number,
            },
        },
        weekly:{
          frequency:{
            type: Number,
          },
          days:{
            type: [String]
          }
        },
        monthly:{
          frequency:{
              type: Number,
            },
            date:{
              type: Number
            },
            day:{
                type: String
            },
            type:{
                type: String
            },
            week:{
              type: Number
          }
        }
      },
      customer: {
        type: String,
        minlength: 5,
        maxlength: 50
      },
      employee: {
        type: String,
        minlength: 5,
        maxlength: 50
      },
       sandata_status:{
        type: Boolean,
        required: true,
        default: false
      },
      delete_status:{
        type: Number,
        required: false,
        default: 1
      }
  });
 

  userSchema.pre('save', function (next) {
    if (this.isNew && 0 === this.repeat.weekly.days.length) {
      this.repeat.weekly.days = undefined;                                                                                                                                   
    }
    // if (this.isNew && 0 === this.repeat.daily.frequency.length) {
    //   this.repeat.daily.days = undefined;                                                                                                                                   
    // }
    next();
  }) 
  const Schedule = mongoose.model('schedule', userSchema);
  
  function validateSchedule(schedule) {
    const schema = [{
      name: Joi.string().min(3).max(50).required(),
      status: Joi.boolean(),
      start_time: Joi.date(),
      end_time: Joi.date(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      type: Joi.string(),
      reason: Joi.string(),
      repeat: Joi.object().keys({
        once: Joi.string(),
        daily: Joi.object().keys({
          frequency: Joi.number(),
        }),
        weekly : Joi.object().keys({
          frequency: Joi.number(),
          days:Joi.array()

        }),
        monthly: Joi.object().keys({
          frequency: Joi.number(),
          date:Joi.number(),
          day:Joi.string(),
          type: Joi.string(),
          week:Joi.number()
        }), 
      }),
      customer: Joi.string(),
      employee: Joi.string(),
        sandata_status: Joi.boolean()
    }];    
    return Joi.validate(schedule, schema);
  }
  


  exports.Schedule = Schedule; 
  exports.validateSchedule = validateSchedule;
 