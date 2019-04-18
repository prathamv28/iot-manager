import { fetch_wrapper, query_wrapper } from './wrapper';

var devices = [];

var deviceTable = document.getElementById('device-table');

function refresh_devices() {
  let url = '/api/device';
  fetch_wrapper(url, {
    method: 'GET'
  }).then((devs) => {
    devices = devs;
    let oldtbody = document.getElementById('device-tbody');
    let tbody = document.createElement('TBODY');
    for(let dev of devices) {
      let row = document.createElement('TR');
      row.insertCell().innerHTML = dev.DeviceId;
      row.insertCell().innerHTML = dev.Location;
      row.insertCell().innerHTML = dev.SensorTypes;
      row.insertCell().innerHTML = dev.Status;
      row.insertCell().innerHTML = new Date(dev.StatusTs);
      tbody.appendChild(row);
    }
    deviceTable.removeChild(oldtbody);
    deviceTable.appendChild(tbody);
    console.log(devices);
  }).catch((err) => {
    console.log(err);
    alert("Request Failed");
  });
}

refresh_devices();
