const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DeviceSchema = new Schema({
  DeviceId: {type: Number},
  Status: {type: String, enum: ['Active', 'Inactive'], default: 'Active'},
  StatusTs: {type: Date, default: Date.now()},
  Location: {type: String},
  SensorTypes: {type: [Number]},
  URL: {type: String}
});

let Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
