require('express-async-errors');
const error = require('./middleware/error');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('config');
const env_config = require('./config/config');
//const express = require('express');
const users = require('./routes/users');
const roles = require('./routes/roles');
const company = require('./routes/company');
const employee = require('./routes/employee');
const express = require('express');
//const helmet = require('helmet');
const secure = require('./routes/secure');
const customer_middleware = require('./middleware/customer');
const company_middleware = require('./middleware/company');
const employee_middleware = require('./middleware/employee');
const customer = require('./routes/customer');
const app = express();
const http = require('http');
const https = require('https');
const cors = require('cors');
app.use(express.static('public'))
console.log('application name'+ config.get("name"))
app.get('/', (req, res) => {
    res.send("working")
});

const mongoUri = env_config.mongo.host;
mongoose.connect(mongoUri,
  { 
    useNewUrlParser: true, 
    useCreateIndex: true 
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
  if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
  require('./config/passport');
  const auth = require('./middleware/auth');
  require('./routes/routes');
  app.use(passport.initialize());
//app.use(passport.session());

app.use(express.json());
app.use(cors());
app.use('/api/profile', auth, secure );
app.use('/api/users',users);
app.use('/api/roles', auth, roles);
app.use('/api/customer', customer);
app.use('/api/company',auth, company);
app.use('/api/employee', auth, employee);
app.use(error);
const port = 4041;
// https.createServer(app).listen(port, function(){
//   console.log("Express server listening on port " + port);
// });
app.listen(port, () => console.log(`listening to port ${port}`))
