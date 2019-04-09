const express = require('express');
const Router = express.Router();

const ServerCtrl = require('../controllers/server.controller');

Router.post('/device.register', ServerCtrl.Device_register);

module.exports = Router;
