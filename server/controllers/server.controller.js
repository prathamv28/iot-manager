const Device = require('../models/device.model');

exports.Device_register = (req, res) => {
  let body = req.body;
  console.log(body);
  if(body.DeviceId == null) {
    res.status(400).json({'msg': "No DeviceId provided"});
    return;
  }

  Device.findOne({DeviceId: body.DeviceId})
    .then((dev) => {
      if(!dev) {
        let device = new Device(req.body);
        device.save()
          .then((result) => {
            console.log(result);
            res.status(201).json({'msg': "Device Registered"});
          })
          .catch((err) => {
            res.status(400).json({'msg': "Bad Request"});
          });
      }
      else {
        res.status(200).json({'msg': "Device already registered"});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({'msg': "Internal Server Error"});
    });
};
