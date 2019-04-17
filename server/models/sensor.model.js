const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SensorSchema = new Schema({
  Type: {type: String, required: true},
  Unit: {type: String, default: ""},
  Status: {type: String, enum: ['Active', 'Inactive'], default: 'Active'},
  StatusTs: {type: Date, default: Date.now()}
});

let Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
