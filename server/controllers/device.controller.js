const Measurement = require('../models/measurement.model');

exports.Msmt_get = (req, res) => {
  Measurement.find(req.query)
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
};

exports.Heartbeat = (req, res) => {
  res.status(200).send();
};
