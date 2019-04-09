const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan     = require('morgan');

const router     = require('./routes/device.route');

const devNo      = Number(process.argv[2]);
const config     = require('./config').devices[devNo];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(config.db.host)
  .then(() => console.log("Connected to DB " + config.db.host))
  .catch((err) => {console.log(err); process.exit();});

app.use('/api', router);

app.listen(config.port, function() {
  console.log('Device ' + devNo + ' listening on ' + config.port);
});
