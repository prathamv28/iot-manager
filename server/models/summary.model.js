const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SummarySchema = new Schema({
  Location: {type: String},
  DeviceId: {type: Number},
  SensorType: {type: String},
  Unit: {type: String, default: ""},
  Summary: {},
  Timestamp: {type: Date, default: Date.now()}
});

let Summary = mongoose.model('Summary', SummarySchema);

module.exports = Summary;
