const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({  
  role:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50

  },
  role_name:{
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50

  },
  company_id:{
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50
  },
  main_permissions:{  
     dashboard:{  
        view:{
          type: Boolean,
          required: true
        },
        add:{
          type: Boolean,
          required: true
        },
        edit:{
          type: Boolean,
          required: true
        },
        delete:{
          type: Boolean,
          required: true
        }
     },
     customers:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     customer_schedules:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     employees:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     attendance:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     payroll:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     analysis:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     report:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     notification:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     }
     

  },
  settings_permissions:{  
     company_profile:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
    checklist:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },      
     payroll:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },      
     employee:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },      
     beacon:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },      
     roles:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     checkin_checkout:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     notifications:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     payers:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     programs:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     },
     shifts:{  
      view:{
        type: Boolean,
        required: true
      },
      add:{
        type: Boolean,
        required: true
      },
      edit:{
        type: Boolean,
        required: true
      },
      delete:{
        type: Boolean,
        required: true
      }
     }
  }
});
  const Role = mongoose.model('roles', userSchema);
  function validateRole(role) {
    const schema = {
      role: Joi.string().min(1).max(50).required(),
      role_name: Joi.string(),
      company_id:Joi.string(),
      main_permissions: Joi.object().keys({
        dashboard: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        customers: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        customer_schedules: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        employees: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        attendance: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        payroll: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        analysis:  Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        report:  Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        notification:  Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        })

      }),
      settings_permissions: Joi.object().keys({
        company_profile: Joi.object({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        checklist: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        payroll: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        employee: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        beacon: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        roles: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        checkin_checkout: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        notifications: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        payers: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        programs: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        }),
        shifts: Joi.object().keys({
          view: Joi.boolean(),
          add: Joi.boolean(),
          edit: Joi.boolean(),
          delete: Joi.boolean(),

        })


      })

    };
  
    return Joi.validate(role, schema);
  }
  
  exports.Role = Role; 
  exports.validate = validateRole;
 