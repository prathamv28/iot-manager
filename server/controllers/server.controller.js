const Device = require('../models/device.model');

exports.Device_register = (req, res) => {
  let body = req.body;
  if(!body.DeviceId) {
    res.status(400, {error: "No DeviceId provided"});
    return;
  }

  Device.findOne({DeviceId: body.DeviceId})
    .then((dev) => {
      if(!dev) {
        let device = new Device(req.body);
        return device.save();
      }
      else {
        res.status(200);
        return Promise.resolve(null);
      }
    })
    .then((dev) => {
      res.status(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
};
