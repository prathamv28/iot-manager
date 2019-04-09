const express = require('express');
const Router = express.Router();

const DeviceCtrl = require('../controllers/device.controller');

Router.get('/msmts', DeviceCtrl.Msmt_get);
Router.get('/heartbeat', DeviceCtrl.Heartbeat);

module.exports = Router;
