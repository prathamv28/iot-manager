const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MeasurementSchema = new Schema({
  SensorId: {type: String},
  SensorType: {type: String},
  Unit: {type: String, default: ""},
  Value: {type: Number},
  createdAt: { type: Number } // datetime
});

let Measurement = mongoose.model('Measurement', MeasurementSchema);

module.exports = Measurement;
