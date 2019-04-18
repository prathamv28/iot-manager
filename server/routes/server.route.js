const express = require('express');
const Router = express.Router();

const Device = require('../models/device.model');
const Summary = require('../models/summary.model');

const ServerCtrl = require('../controllers/server.controller');
const QueryCtrl = require('../controllers/query.controller');

Router.get('/device', QueryCtrl.Query(Device));
Router.post('/device', ServerCtrl.Device_register);

Router.get('/summary', QueryCtrl.Query(Summary));
Router.post('/summary', QueryCtrl.Post(Summary));

// Router.get('/summary/custom', ServerCtrl.Get_Summary);

module.exports = Router;
