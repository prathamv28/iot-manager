const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MeasurementSchema = new Schema({
  SensorId: {type: String},
  SensorType: {type: String},
  Unit: {type: String, default: ""},
  Value: {type: Number},
  createdAt: { type: Date, expires: 3600*24*7, default: Date.now() }
});

let Measurement = mongoose.model('Measurement', MeasurementSchema);

module.exports = Measurement;
