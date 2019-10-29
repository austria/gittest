const passport = require('passport');
const { User, validate } = require('../models/user');
const { EmployeeTracking, validateEmpTracking } = require('../models/employee_tracking');
const { Booking, validateBooking } = require('../models/booking');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const localStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const nodemailer = require('nodemailer');
const { Attendance, validateAttendance } = require('../models/employee_attendance');
const { Schedule, validateSchedule } = require('../models/schedule');

const moment = require('moment');
const { forEach } = require('p-iteration');
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
      // console.log(file);
      var filetype = '';
      if (file.mimetype === 'image/gif') {
          filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
          filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage }).single('file');

router.put('/', async (req, res) => {
  const schema = {
    //        detail: Joi.object().keys({
    //   phone: Joi.number(),
    first_name: Joi.string().min(3).max(255),
    last_name: Joi.string().min(3).max(255),
    //   timezone: Joi.string().min(5).max(255),
    //   location: Joi.string().min(5).max(255),
    //   position: Joi.string().min(5).max(255),
    //   department: Joi.string().min(5).max(255),
    //   supervisor: Joi.string().min(5).max(255),
    //   street: Joi.string().min(5).max(255),
    address: Joi.object().keys({
      full_address: Joi.string().min(3).max(255),
      city: Joi.string().min(3).max(255),
      state: Joi.string().min(3).max(255),
      company_timezone: Joi.string().min(3).max(255),
      zip_code: Joi.number(),
      apartment_no: Joi.string().min(3).max(255),
    }),
    emergency_contact: Joi.object().keys({
      full_name: Joi.string().min(3).max(255),
      relation: Joi.string().min(3).max(255),
      email: Joi.string().min(3).max(255),
      phone: Joi.number(),
      address: Joi.string().min(3).max(255),
    }),
    // pay_criteria: Joi.object().keys({
    //     rate: Joi.number(),
    //     hourly_rate: Joi.number(),
    //     monthly_salary: Joi.number(),
    //     annual_salary: Joi.number(),
    //     weekly_salary: Joi.number(),
    //     set_rate: Joi.number(),
    // }),
    //   }),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);
  const user_id = req.user.user._id;
  const info = _.pick(req.body, ['address', 'emergency_contact']);
  user = await User.updateOne({ _id: user_id }, { $set: { detail: info } });
  res.json({
    message: 'Employee is Updated',
    user: user._id
  })
});

router.put('/employee-edit', async (req, res) => {
  const user_id = req.user.user._id;
  console.log("id is"+user_id);
  let info = req.body;
  //user = await User.updateOne({ _id:req.params.id }, { $set: info });
  user = await User.findOneAndUpdate({ _id: user_id }, _.pick(req.body, ['detail','email', 'name']))

  if (!user) return res.status(400).send('User not updated');
  // return res.json({
  //     message: 'User Profile is updated'
  // });
  // let employee_edit = await User.findOneAndUpdate({ _id: req.params.id }, {
  //     $set: req.body
  // });

  // let employee_schedule = await Schedule.findOneAndUpdate({ _id: schedule_id }, {
  //     $set: req.body.schedule
  // });

  res.status(200).json({
      message: "Employee update Successfully"
  });
});


router.get('/', async (req, res) => {
  const user_id = req.user.user._id;
  let user = await User.find({ _id: user_id });
  if (!user) return res.status(400).send('Employee not Found');
  res.json({
    user: user
  })
});

router.put('/employee-password-edit/:id', async (req, res) => {
  let password =  req.body.password
  let pass1 = await bcrypt.hash(password,10);
  req.body.password = pass1
   let test = await User.findOneAndUpdate({ _id: req.params.id }, _.pick(req.body, ['password']))
   res.status(200).json({
      message: "Password Updated Successfully"
  })
});

router.post('/employee-tracking', async (req, res) => {
  let { error } = validateEmpTracking(req.body);
  if (error) return res.json({ "error": error.details[0].message });
  const active_employee = await EmployeeTracking.findOne({ $and :[{booking_id: req.body.booking_id}, 
    {employee_id: req.body.employee_id}]});
    console.log("debug process started in employee")
    console.log(active_employee);
  if(active_employee){
    var result = await EmployeeTracking.updateOne({booking_id: req.body.booking_id},{$set:{status:req.body.status }});
    console.log("we h res");
    console.log(result);
    if(result.ok == 1)
    {
      await EmployeeTracking.updateOne({"_id": active_employee._id},{$push:{tracking:req.body.tracking }});
    }
      
      res.json({
        message: "data save"   
       });
  }else{
    console.log('new value');
    let employeetracking = new EmployeeTracking(req.body);
    // data = await employeetracking.save();
     data = await employeetracking.save();
     console.log("nw emp is create4ddddddddddddddddddd");
     console.log(employeetracking._id)
     res.json({
      message: employeetracking._id   
     });
  }
  res.json({
    message: "data not save"   
   });
});

router.get('/mail', async (req, res) => {

  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "95e4c8d1ed1b16",
      pass: "211932a2da09cd"
    }
  });

  var mailOptions = {
    from: 'itsmewolfking@gmail.com',
    to: 'myfriend@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send('mail send');
});


router.get('/customer', async (req, res) => {
  const id = req.user.user._id;
  const employee_user = await User.findOne({ _id: id });
  const user_id = employee_user.company_id;
  let user = await User.find({ $and: [{ company_id: user_id }, { roles: "customer" }] });
  if (!user || user.length == 0) {
    return res.json({
      message: 'Customer not Found',
    });
  }
  return res.json({
    customers: user,
  });
});
router.get('/customer/:id', async (req, res) => {
  let return_checklist = [];
  let return_checklist_custom = [];
  let customer = await User.findById({ _id: req.params.id })
  // let check_list =Customer.detail.check_list

  let checklists = await CheckList.find();
  await forEach(checklists, async checklist => {

    const category = await Category.findOne({ _id: checklist.category });
    let tasks = [];

    customer.detail.check_list.forEach(task_id => {
      var task = checklist.tasks.find(x => x._id == task_id);
      if (task != null) { tasks.push(task) };
    });
    checklist.tasks = tasks;
    checklist.category = category.name;
    return_checklist.push(checklist);
    if (checklist.type == 'custom') {

      return_checklist_custom.push(checklist);
    }
  });
  if (!customer) {
    res.status(400).json({ message: "Customer not found" })
  }
  var detail = customer.detail;
  var name = customer.name;
  var email = customer.email;
  // customer.detail.check_lists = checklistss;
  return res.json({
    "name": name,
    "email": email,
    detail,
    return_checklist,
    return_checklist_custom
  });

  // res.status(200).send(Customer)
});
router.put('/customer-edit/:id', async (req, res) => {
  let customer_edit = await User.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }
  )
  res.status(200).json({
    message: "Data Updated Successfully"
  })
});
router.post('/customer', async (req, res) => {

  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    //roles: Joi.string().min(5).max(255).required(),
    detail: Joi.object().keys({
      phone: Joi.string(),
      first_name: Joi.string().min(3).max(255),
      last_name: Joi.string().min(3).max(255),
      other_phone: Joi.string(),
      gender: Joi.string().min(3).max(255),
      date_of_birth: Joi.date(),
      type: Joi.string().min(5).max(255),
      beacon: Joi.string().min(5).max(255),
      status: Joi.string().min(3).max(255),
      social_security_no: Joi.number(),
      address: Joi.object().keys({
        full_address: Joi.string().min(5).max(255),
        city: Joi.string().min(2).max(255),
        state: Joi.string().min(5).max(255),
        zip_code: Joi.string(),
        place_id: Joi.string(),
        geo_fence_name: Joi.string(),
        radius: Joi.number(),
        radius_unit: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        country: Joi.string().min(3).max(255),
      }),
      signature_required: Joi.boolean(),
      scheduling_required: Joi.boolean(),
      enable_geofence: Joi.boolean(),
      customer_waiver: Joi.boolean(),
      check_list: Joi.array().required(),
      emergency_contact: Joi.object().keys({
        full_name: Joi.string().min(3).max(255),
        phone: Joi.string()
      }),

    }),

  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  //user = new User(_.pick(req.body, ['name', 'email', 'password','roles']));
  const id = req.user.user._id;
  const employee_user = await User.findOne({ _id: id });
  const user_id = employee_user.company_id;
  let customer_info = req.body;
  customer_info.company_id = user_id;
  customer_info.roles = 'customer';
  user = new User(customer_info);
  await user.save();
  res.json({
    message: 'Customer is Created',
    user: user._id
  })
});
router.get('/employee-dashboard', async (req, res) => {
  const user_id = req.user.user._id;
  var employee_booking = await Booking.find({
  	$and:[
  	{status: 1},
  	{employee:{$elemMatch:{id:user_id}}}
  	]

  }, {status: 1}).count();
  var employee_schedule = await Booking.find({
  	$and:[
  	{status: 0},
  	{employee:{$elemMatch:{id:user_id}}}
  	]

  }, {status: 1}).count();
   var customer_handle = await Booking.find({
  	$and:[
  	{employee:{$elemMatch:{status: 1}}},
  	{employee:{$elemMatch:{id:user_id}}}
  	]

  }).count();
  ///employee_booking.forEach(element => {
    ///emp_booking_count.push(element.employee.length);
  //});
  
  
 async function calculateMonth(months, curent_year){
  	var i = 1;
  	const calculate_year = [];
  	for(let value of months ){
		var start = new Date(current_year, i, 1);
		var end = new Date(current_year, i, 30);
	var bookings = await Booking.find({
  			$and:[
  				{employee:{$elemMatch:{id:user_id}}},
  				{employee:{$elemMatch:{start_time:{$gte: start, $lt: end}}}}

  			]	

  		}).count();
  	
  		var obj = {
  			"month_year": current_year+'  '+value,
  			"bookings":bookings
  			
  		};
  		calculate_year.push(obj);
  		i++;
  	}
  	
  	return calculate_year;
  }
  const current_year = new Date().getFullYear();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const months_record = await calculateMonth(months, current_year);
  console.log(months_record);
  // const booking_sum = emp_booking_count.reduce(add, 0);
  // function add(accumulator, a) {
  //   return accumulator + a;
  // }
  var dashboard_stats = {
    "jobs_completed": employee_booking,
    "job_schedule": employee_schedule,
    "total_jobs": employee_booking+employee_schedule,
    "customer_handled":customer_handle,
    "monthly_data": months_record
    // 'customers_count': customers_count,
    // 'global_checklist_count': global_checklist_count,
    // 'custom_checklist_count': custom_checklist_count,
    // 'custom_global_checklist_count': custom_global_checklist_count,
    // 'total_checklist_count': total_checklist_count,
    // 'beacons_configured': customers_count,
    // "scheduled_employees": booking_sum
  }
  res.json({
    dashboard_stats
  });
});

router.get('/employee-attendance/:id', async (req, res) => {
  var employee_att_list = [];
  const attendance = await Attendance.find({"employee": req.params.id});
  await forEach(attendance, async record => {
      let schedule = await Schedule.findOne({ _id: record.schedule_id });
      try {
          let customer = await User.findOne({ _id: schedule.customer });
          let employee = await User.findOne({ _id: record.employee });
          let supervisor = await User.findOne({ 'detail.supervisor': employee.detail.supervisor });
          let jsonifyArray = {
              attendance_id: record._id,
              booking_id: record.booking,
              employee: employee.name,
              customer: customer.name,
              schedule_checkin: schedule.start_time,
              schedule_checkout: schedule.end_time,
              actual_checkin: moment.utc(record.actual_checkin).format("YYYY-MM-DDTHH:mm:ss"),
              date:moment.utc(record.date).format("YYYY-MM-DDTHH:mm:ss"),
             // actual_checkin: record.actual_checkin,
              actual_checkout: moment.utc(record.actual_checkout).format("YYYY-MM-DDTHH:mm:ss"),
              minor_checkin_checkout: record.minor_checkin_checkout,
             // supervisor: employee.detail.supervisor,
              supervisor: supervisor.name,
              type: employee.detail.type,
             // type: schedule.type,
              status: record.status
          };
          employee_att_list.push(jsonifyArray);
        console.log(employee_att_list)
        } catch (e) {
          console.log(e);
      }
    
  });
  employee_att_list.sort((a, b) => (b.attendance_id > a.attendance_id) ? 1 : -1)
  return res.status(200).json({
      employee_attendance: employee_att_list
  });
  });

  router.put('/employee-edit/:id', async (req, res) => {
    //user = await User.updateOne({ _id:req.params.id }, { $set: info });
   user = await User.findOneAndUpdate({ _id: req.params.id }, 
       {
         $set:{
               "detail.street":req.body.street,
               'detail.address.city':req.body.city,
               'detail.address.state':req.body.state,
               'detail.address.zip_code':req.body.zip_code,
               'detail.address.country':req.body.country,
               'name':req.body.name,
               'email':req.body.email
       }
     });
   if (!user) return res.status(400).send('User not updated');
   res.status(200).json({
       message: "Employee update Successfully"
   });
 });

 router.post('/employee-profile-picture', function async(req, res, next) {
  const user_id = req.user.user._id;
  var path = '';
  upload(req, res, async function (err) {
      if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
      }
      // No error occured.
      path = req.file.path;
    //   return res.json({
    //     message: path
    // });
      user = await User.updateOne({ _id: user_id }, { $set: { "detail.file": req.file.filename } }, { upsert: true });
      return res.json({
          message: 'Image Uploaded'
      });

  });
})
module.exports = router; 