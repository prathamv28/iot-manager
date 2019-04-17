const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const rp         = require('request-promise-native');

const router     = require('./routes/device.route');
const config     = require('./config');
const utils      = require('./utils');

const devNo      = Number(process.argv[2]);
if(devNo == null) {
  console.log(devNo);
  console.log("Device Id not procided");
  process.exit(1);
}
const devConfig  = config.devices[devNo];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(devConfig.db.host)
  .then(() => {
    console.log("Connected to DB " + devConfig.db.host);
  })
  .catch((err) => {console.log(err); process.exit();});

// Register to main server
rp({
  method: 'POST',
  uri: config.server.host + ":" + config.server.port.toString() + '/api/device',
  body: {
    DeviceId: devNo,
    Location: devConfig.location,
    SensorTypes: devConfig.sensorTypes,
    URL: devConfig.host + ":" + devConfig.port.toString() + "/api"
  },
  json: true
})
  .then((body) => {
    console.log("Device " + devNo.toString() + " registered on main server");
  })
  .catch((err) => {
    console.log(err);
    console.log("Cannot register Device " + devNo.toString() + " to main server");
  });

// Routers
app.use('/api', router);

app.listen(config.devices[devNo].port, function() {
  console.log('Device ' + devNo + ' listening on ' + config.devices[devNo].port);
  utils.SendSummary(devNo);
});
