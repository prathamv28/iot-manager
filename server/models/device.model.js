const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DeviceSchema = new Schema({
  DeviceId: {type: Number},
  Status: {type: Boolean, default: false},
  StatusTs: {type: Date, default: Date.now()},
  Location: {type: String},
  SensorTypes: {type: [Number]}
});

let Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
