const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const rp         = require('request-promise-native');

const config     = require('./config').server;
const utils      = require('./utils');

const router     = require('./routes/server.route');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(config.db.host)
  .then(() => console.log("Connected to DB " + config.db.host))
  .catch((err) => {console.log(err); process.exit();});

app.use('/api', router);

app.listen(config.port, function() {
  console.log('Main server listening on ' + config.port);
  utils.Heartbeat();
});
