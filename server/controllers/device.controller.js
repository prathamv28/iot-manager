const Measurement = require('../models/measurement.model');

const config = require('../config');

exports.Heartbeat = (req, res) => {
  res.status(200).send();
};
