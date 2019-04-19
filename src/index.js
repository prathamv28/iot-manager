import { fetch_wrapper, query_wrapper } from './wrapper';

var devices = [];
var locations = [];
var deviceTable = document.getElementById('device-table');

function refresh_devices() {
  let url = '/api/device';
  fetch_wrapper(url, {
    method: 'GET'
  }).then((devs) => {

    devices = devs;
    let oldtbody = document.getElementById('device-tbody');
    let tbody = document.createElement('TBODY');
    var summary_drop = document.getElementById('location-table');
    var range_drop = document.getElementById('range-table');

    for(let dev of devices) {
      let row = document.createElement('TR');
      row.insertCell().innerHTML = dev.DeviceId;
      row.insertCell().innerHTML = dev.Location;
      row.insertCell().innerHTML = dev.SensorTypes;
      row.insertCell().innerHTML = dev.Status;
      row.insertCell().innerHTML = new Date(dev.StatusTs);
      tbody.appendChild(row);

      if(locations.indexOf(dev.Location)==-1){
        locations.push(dev.Location);
        var opt = document.createElement('option');
        var opt2 = document.createElement('option');
        opt.appendChild(document.createTextNode(dev.Location));
        opt.value = dev.Location;
        opt2.appendChild(document.createTextNode(dev.Location));
        opt2.value = dev.Location;
        summary_drop.appendChild(opt)
        range_drop.appendChild(opt2)
      }

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
console.log('Hello');

document.getElementById('my-form').onsubmit = function(){

    let url = '/api/summary/custom';
    let params = {
      'location':document.getElementById('location-table').value,
      'time':document.getElementById('time').value
    };
    url = query_wrapper(url, params);
    fetch_wrapper(url, {
        method: 'GET'
    }).then((devs) =>{

      var props = devs;
      var table = document.getElementById('location-stats-table');
      var old_table_body = document.getElementById('location-stats-table-body');
      var table_body = document.createElement('TBODY');
      table_body.id= "location-stats-table-body";

      let row = document.createElement('TR');
      row.insertCell().innerHTML = "<b> Property <b>";
      row.insertCell().innerHTML = "<b> Average <b>";
      row.insertCell().innerHTML = "<b> Max <b>";
      row.insertCell().innerHTML = "<b> Min <b>";
      table_body.appendChild(row);

      for(let prop in props['Average']) {
        let row = document.createElement('TR');
        row.insertCell().innerHTML = prop;
        row.insertCell().innerHTML = props['Average'][prop];
        row.insertCell().innerHTML = props['Max'][prop];
        row.insertCell().innerHTML = props['Min'][prop];
        table_body.appendChild(row);
      }

      table.removeChild(old_table_body);
      table.appendChild(table_body);

    }).catch((err) => {
    console.log(err);
    alert("Request Failed");
  });

   return false;
 }


document.getElementById('range-form').onsubmit = function(){
    console.log("Yes");
    let url = '/api/range';
    let params = {
      'lower_bound':document.getElementById('lower_limit').value,
      'upper_bound':document.getElementById('upper_limit').value,
      'limit':document.getElementById('res_limit').value,
      'location':document.getElementById('range-table').value,
      'param':document.getElementById('range-param').value,
    };
    console.log(params);
    url = query_wrapper(url, params);
    fetch_wrapper(url, {
        method: 'GET'
    }).then((devs) =>{

      var props = devs['res'];
      var table = document.getElementById('range-stats-table');
      var old_table_body = document.getElementById('range-stats-table-body');
      var table_body = document.createElement('TBODY');
      table_body.id= "range-stats-table-body";

      console.log(devs);

      let row = document.createElement('TR');
      row.insertCell().innerHTML = "<b> Day <b>";
      row.insertCell().innerHTML = "<b> Time <b>";
      row.insertCell().innerHTML = "<b> Value <b>";
      table_body.appendChild(row);

      for(var i=0; i< props.length; i++) {
        console.log(props[i]);
        let row = document.createElement('TR');
        row.insertCell().innerHTML = props[i]['day'];
        row.insertCell().innerHTML = props[i]['time'];
        row.insertCell().innerHTML = props[i]['val'];
        table_body.appendChild(row);
      }

      table.removeChild(old_table_body);
      table.appendChild(table_body);

    }).catch((err) => {
    console.log(err);
    alert("Request Failed");
  });

   return false;
 }

