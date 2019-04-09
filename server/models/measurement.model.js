const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MeasurementSchema = new Schema({
  SensorId: {type: Number},
  SensorType: {type: Number},
  Unit: {type: String, default: ""},
  Value: {type: Number},
  Timestamp: {type: Date, default: Date.now()}
});

let Measurement = mongoose.model('Measurement', MeasurementSchema);

module.exports = Measurement;
