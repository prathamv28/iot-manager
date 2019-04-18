const config = require('./config');
const rp = require('request-promise-native');

const Device = require('./models/device.model');
const Measurement = require('./models/measurement.model');

var unitMap = {
  "Temperature": "deg C",
  "Humidity": "g/m3",
  "Pressure": "atm"
};

function submitSummary(devNo) {
  let devConfig = config.devices[devNo];
  let t0 = new Date(Date.now() - 4*config.fetchFreq);
  let group_query = {
      _id: "$SensorType",
  };
  return Measurement.aggregate([
    {
      $match: {
        createdAt: {
          $gte: t0
        }
      }
    },
    {
      $group: {
        _id: "$SensorType",
        Average: {
          $avg: "$Value"
        },
        Max: {
          $max: "$Value"
        },
        Min: {
          $min: "$Value"
        },
        Count: {
          $sum: 1
        }
      }
    },
  ])
    .then((results) => {
      // console.log(results);
      let promises = [];
      for(let result of results) {
        if(result.Count == 0) {
          continue;
        }
        let payload = {
          Location: devConfig.location,
          DeviceId: devNo,
          SensorType: result._id,
          Unit: unitMap[result._id],
          Summary: {
            Average: result.Average,
            Max: result.Max,
            Min: result.Min,
            Count: result.Count
          }
        };
        let p = rp({
          method: 'POST',
          uri: config.server.host + ":" + config.server.port + "/api/summary",
          body: payload,
          json: true
        });
        promises.push(p);
      }
      return Promise.all(promises);
    })
    .catch((err) => {
      console.log(err);
      Promise.reject(err);
    });

};

function SendSummary(devNo) {
  submitSummary(devNo).then((result) => {
    console.log("Summary submitted at " + new Date());
    setTimeout(() => SendSummary(devNo), config.fetchFreq);
  })
    .catch((err) => {
      console.log(err);
    });
}
exports.SendSummary = SendSummary;

function heartbeat() {
  let promises = [];
  let status;
  for(let dev of config.devices) {
    let p = rp({
      method: 'GET',
      uri: dev.host + ":" + dev.port.toString() + "/api/heartbeat"
    })
        .then((result) => {
          status = 'Active';
          return Device.findOne({DeviceId: dev.deviceId});
        })
        .catch((err) => {
          status = 'Inactive';
          return Device.findOne({DeviceId: dev.deviceId});
        })
        .then((device) => {
          if(device!=null && device.Status != status) {
            device.Status = status;
            device.StatusTs = Date.now();
            return device.save();
          }
          else {
            return Promise.resolve(null);
          }
        })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
          Promise.reject(err);
        });
    promises.push(p);
  }
  return Promise.all(promises);
}

function Heartbeat() {
  heartbeat().then(() => {
    setTimeout(() => {
      // console.log("Heartbeat: " + new Date());
      Heartbeat();
    }, config.heartbeat);
  })
    .catch((err) => {
      console.log(err);
    });
}
exports.Heartbeat = Heartbeat;
