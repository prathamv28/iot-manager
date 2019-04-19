const Measurement = require('../models/measurement.model');
const Summary = require('../models/summary.model');

exports.Query  = function (model) {
  return (req, res) => {
    model.find(req.query)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({'msg': 'Internal Server Error'});
      });
  };
};

exports.QueryById = function (model) {
  return (req, res) => {
    model.findById(req.params.id)
      .then((result) => {
        if(!result) {
          res.status(404).json({'msg': "Document not found"});
        }
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({'msg': 'Internal Server Error'});
      });
  };
};

exports.Post = function (model) {
  return (req, res) => {
    let instance = new model(req.body);
      if(model == Measurement) {
          instance.createdAt = Date.now();
      }
      if(model == Summary) {
          instance.Timestamp = Date.now();
      }
    instance.save()
      .then((result) => {
        // console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({'msg': "Bad Request"});
      });
  };
};

exports.Delete = function (model) {
  return (req, res) => {
    model.deleteMany(req.query)
      .then((result) => {
        res.status(200).json({});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({'msg': "Internal Server Error"});
      });
  };
};
