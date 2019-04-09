let mongoose = require('mongoose');
let config = require('../server/config');

mongoose.connect(config.dev1.db.host);

let Measurement = require('../server/models/measurement.model');

exports.createMsmt = (sid, stype, unit, value) => {
  let msmt = new Measurement();
  msmt.SensorId = sid;
  msmt.SensorType = stype;
  msmt.Unit = unit;
  msmt.Value = value;
  msmt.save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
};

exports.findMsmt = () => {
  Measurement.find({}, function(err, docs) {
    if(err){
      console.log(err);
      return;
    }
    console.log(docs);
  });
};
