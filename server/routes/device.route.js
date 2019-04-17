const express = require('express');
const Router = express.Router();

const Measurement = require('../models/measurement.model');
const Sensor = require('../models/sensor.model');

const DeviceCtrl = require('../controllers/device.controller');
const QueryCtrl = require('../controllers/query.controller');

Router.get('/measurement', QueryCtrl.Query(Measurement));
Router.get('/measurement/:id', QueryCtrl.QueryById(Measurement));
Router.post('/measurement', QueryCtrl.Post(Measurement));

Router.get('/sensor', QueryCtrl.Query(Sensor));
Router.get('/sensor/:id', QueryCtrl.QueryById(Sensor));
Router.post('/sensor', QueryCtrl.Post(Sensor));
Router.delete('/sensor', QueryCtrl.Delete(Sensor));

Router.get('/heartbeat', DeviceCtrl.Heartbeat);

module.exports = Router;
