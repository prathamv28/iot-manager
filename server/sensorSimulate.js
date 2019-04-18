const rp = require('request-promise-native');
const sleep = require('sleep');
const config = require('./config');

var unitMap = {
  "Temperature": "deg C",
  "Humidity": "g/m3",
  "Pressure": "atm"
};

function getRandom(from, to) {
  return () => {
    return from + Math.random()*(to-from);
  };
}

var genMap = {
  "Temperature": getRandom(-10, 40),
  "Humidity": getRandom(0,30),
  "Pressure": getRandom(0,1)
};

// Delete all sensors from all devices
async function deleteSensors() {
  let deletePromises = [];
  for(let dev of config.devices) {
    let p = rp({
      method: 'DELETE',
      uri: dev.host + ":" + dev.port + "/api/sensor"
    }).then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    deletePromises.push(p);
  }
  return Promise.all(deletePromises);
};

async function registerSensors() {
  let registerPromises = [];
  for(let dev of config.devices) {
    for(let typ of dev.sensorTypes) {
      let p = rp({
        method: 'POST',
        uri: dev.host + ":" + dev.port + "/api/sensor",
        body: {
          Type: typ,
          Unit: unitMap[typ]
        },
        json: true
      }).then((result) => {
        return result._id;
      })
          .catch((err) => {
            console.log(err);
          });
      registerPromises.push(p);
    }
  }
  return Promise.all(registerPromises);
}

function genMsmt(sids) {
  let idCount = 0;
  let promises = [];
  for(let dev of config.devices) {
    for(let typ of dev.sensorTypes) {
      let p = rp({
        method: 'POST',
        uri: dev.host + ":" + dev.port + "/api/measurement",
        body: {
          SensorId: sids[idCount++],
          SensorType: typ,
          Unit: unitMap[typ],
          Value: genMap[typ]()
        },
        json: true
      }).then((result) => {})
          .catch((err) => console.log(err));
      promises.push(p);
    }
  }
  return Promise.all(promises);
}

function generateData(sids) {
  genMsmt(sids)
    .then(() => {
      console.log("Measurement generated at " + new Date());
      setTimeout(() => generateData(sids), config.genFreq);
    })
    .catch((err) => console.log(err));
}


deleteSensors()
  .then(() => {
    return registerSensors();
  })
  .then((sids) => {
    generateData(sids);
  })
  .catch((err) => {
    console.log(err);
  });
