const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SensorSchema = new Schema({
  Type: {type: Number, required: true},
  Unit: {type: String, default: ""}
});

let Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
