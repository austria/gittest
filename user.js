const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var r = Math.random().toString(36).substring(7);
const userSchema = new mongoose.Schema({
	uuid:{
      type: String, 
      required: true,
      default: "uuid"+r
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  roles: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  company_id: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  detail: {
    company_ma: {
      type: String,
      required:false
    },
    website: {
      type: String,
      minlength: 3,
      maxlength: 100
    },
    initials: {
      type: String,
      minlength: 3,
      maxlength: 10
    },
    suits: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    timezone: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    street: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    first_name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    last_name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 150
    },
    other_phone: {
      type: String,
      minlength: 5,
      maxlength: 150
    },
    gender: {
      type: String,
      minlength: 4,
      maxlength: 6
    },
    type: {
      type: String,
      minlength: 3,
      maxlength: 10
    },
    department: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    location: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    position: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    date_of_birth: {
      type: Date
    },
    supervisor: {
      type: String,
      minlength: 3,
      maxlength: 150
    }
    ,
    social_security_no: {
      type: Number,
      minlength: 5,
      maxlength: 150
    },
    type: {
      type: String,
      minlength: 5,
      maxlength: 160
    },
    employee_ssn: {
      type: String,
      minlength: 1,
      maxlength: 560
    },
    medical_id:{
      type: String,
      minlength: 1,
      maxlength: 560,
      required:false
    },
    identifier:{
      type: String,
      minlength: 1,
      maxlength: 560,
      required:false
    },
    
    program:{
      type: String,
      minlength: 1,
      maxlength: 560
    },
    payer:{
      type: String,
      minlength: 1,
      maxlength: 560
    },
    icd_code:{
      type: String,
      minlength: 1,
      maxlength: 560
    },
    signature_required: {
      type: Boolean,
      default: false
    },
    scheduling_required: {
      type: Boolean,
      default: false
    },
    enable_geofence: {
      type: Boolean,
      default: false
    },
    customer_waiver: {
      type: Boolean,
      default: false
    },
    check_list: {
      type: [String],
    },
    emergency_contact: {
      full_name: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      relation: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      email: {
        type: String,
        minlength: 3,
        maxlength: 150,
        required:false
      },
      phone: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      address: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      geo_fence:{
        type: Boolean,
        default: false
  
      },
      geo_beacon:{
        type: Boolean,
        default: false
  
      },
      geo_tracking:{
        type: Boolean,
        default: false
  
      },
    },
    pay_criteria: {
      hourly_rate: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      monthly_salary: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      annual_salary: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      weekly_salary: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      overtime_hours: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      increamentedHourlyRate: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      increamentedSalaryRate: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      duration: {
        type: String,
        minlength: 3,
        maxlength: 150
      },

    },
    address: {
      full_address: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      city: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      state: {
        type: String,
        minlength: 2,
        maxlength: 150
      },
      country: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      address_type: {
        type: String,
        minlength: 1,
        maxlength: 150
      },
      time_zone:{
        type: String,
        minlength: 1,
        maxlength: 150
      },
      address_one:{
        type: String,
        minlength: 1,
        maxlength: 450
      },
      zip_code: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      place_id: {
        type: String,
        minlength: 3,
        maxlength: 356
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
      company_timezone: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      geo_fence_name: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      radius: {
        type: Number,
        minlength: 3,
        maxlength: 150
      },
      radius_unit: {
        type: String,
        minlength: 3,
        maxlength: 150
      },
      apartment_no: {
        type: String,
        minlength: 2,
        maxlength: 150
      },
    },
    car_giver_type: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    schedule_supervisor: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    schedule_required: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    file: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    beacon: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    status: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    
  },
  payroll_schedule: {
    day: {
      type: Number
    },
    payroll_period: {
      type: Number
    },
    date: {
      type: String
    }
  },
  departments: [{
    name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
  }],
  locations: [{
    name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    address: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    place_id: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    latitude: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    longitude: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    beacon_id: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    radius: {
      type: Number,
      minlength: 3,
      maxlength: 15
    },
  }],
  positions: [{
    name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    colour: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
  }],
  shifts: [{
    name: {
      type: String,
      minlength: 3,
      maxlength: 150
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 15
    },
    start_time: {
      type: Date,
      minlength: 3,
      maxlength: 150
    },
    end_time: {
      type: Date,
      minlength: 3,
      maxlength: 150
    },
    location: {
      type: String,
      minlength: 3,
      maxlength: 150
    }
  }],
  general: {
    time_format: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    currency: {
      type: String,
      minlength: 1,
      maxlength: 150
    }

  },
  checkin: {
    early_checkin_time: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    early_checkout_time: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    late_checkin_time: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    late_checkout_time: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    force_checkout_time: {
      type: String,
      minlength: 1,
      maxlength: 150
    }

  },
  web_notifications: [{
    role: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    early_checkin: {
      type: Boolean,
      required: true
    },
    late_checkin: {
      type: Boolean,
      required: true
    },
    early_checkout: {
      type: Boolean,
      required: true
    },
    late_checkout: {
      type: Boolean,
      required: true
    },
    force_checkout: {
      type: Boolean,
      required: true
    },
    bluetooth: {
      type: Boolean,
      required: true
    },
    qr_checkin_checkout: {
      type: Boolean,
      required: true
    },
    fence_in_out: {
      type: Boolean,
      required: true
    }

  }],
  mobile_notifications: [{
    role: {
      type: String,
      minlength: 1,
      maxlength: 150
    },
    attendance: {
      type: Boolean,
      required: true
    },
    check_list: {
      type: Boolean,
      required: true
    },
    schedule_date_time: {
      type: Boolean,
      required: true
    }
  }],
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
    },
    squence_id: {
      type: String
    }
  }],
  isAdmin: Boolean
});
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}
const User = mongoose.model('User', userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    //email: Joi.string().min(5).max(255).required().email(),
    email: Joi.string().min(5).max(255).email(),
    //email: Joi.string().min(5).max(255).email().allow(null, ''),
    password: Joi.string().min(5).max(255).required(),
    //  roles: Joi.string().min(5).max(255).required(),
    detail: Joi.object().keys({
      phone: Joi.string(),
      gender: Joi.string().min(4).max(6),
      date_of_birth: Joi.date(),
      emergency_contact_name: Joi.string().min(5).max(255),
      emergency_contact: Joi.number(),
      website: Joi.string().min(5).max(255),
      address: Joi.object().keys({
        full_address: Joi.string().min(5).max(255),
        city: Joi.string().min(5).max(255),
        zip_code: Joi.string(),
        state: Joi.string().min(2).max(255),
      }),
      car_giver_type: Joi.string().min(5).max(255),
      schedule_supervisor: Joi.string().min(3).max(255),
      schedule_required: Joi.string().min(5).max(255),
      file: Joi.string().min(5).max(255),
    }),

  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;