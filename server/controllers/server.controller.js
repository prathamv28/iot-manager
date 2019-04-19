const Device = require('../models/device.model');
const Summary = require('../models/summary.model');

exports.Device_register = (req, res) => {
  let body = req.body;
  // console.log(body);
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
            // console.log(result);
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



exports.Get_Summary = (req, res) => {
    // res.json({'debug':1})
    let q = {
        Location: req.query.location
    };
    let limit = 5;
    if(req.query.limit) {
        limit = Number(req.query.limit);
    }

    if(req.query.time) {
        q['Timestamp'] = {
            $gte: Date.now()-Number(req.query.time)*1000
        };
    }
    Summary.find(q)
        .sort({'Timestamp': -1}).limit(limit)
        .then((result) => {

        //For summary of different data on a given location
        var res_json={};
        var count_json={};
        var max_json={};
        var min_json={};

        for(i=0; i<result.length; i++){

            if(result[i]["SensorType"] in res_json){
              res_json[result[i]["SensorType"]]+=  result[i]['Summary']['Average'];
              count_json[result[i]["SensorType"]]+=  1;

              if( result[i]['Summary']['Max'] > max_json[result[i]["SensorType"]] ){
                max_json[result[i]["SensorType"]]= result[i]['Summary']['Max'];
              }


              if( result[i]['Summary']['Min'] < min_json[result[i]["SensorType"]] ){
                min_json[result[i]["SensorType"]]= result[i]['Summary']['Min'];
              }

            }
            else{
              res_json[result[i]["SensorType"]]=  result[i]['Summary']['Average'];
              count_json[result[i]["SensorType"]]= 1;
              max_json[result[i]["SensorType"]]= result[i]['Summary']['Max'];
              min_json[result[i]["SensorType"]]= result[i]['Summary']['Min'];
            }
        }
        for(var key in res_json){
              res_json[key] /= count_json[key];
        }

            res.json({ 'Average' : res_json, 'Max':max_json, 'Min':min_json});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({'msg': "Internal Server Error"});
        });
};


exports.Get_Range = (req, res) => {
    let q = {
        Location: req.query.location,
        SensorType: req.query.param
    };

    limit=5;
    if(req.query.limit){
      limit=parseInt(req.query.limit);
    }
    Summary.find(q)
        .sort({'Timestamp': -1}).limit(limit)
        .then((result) => {

        //For summary of different data on a given location
        let lower_bound=-1;
        let upper_bound=1000000;
        if(req.query.lower_bound ){
          lower_bound= req.query.lower_bound;
        }
        if(req.query.upper_bound ){
          upper_bound= req.query.upper_bound;
        }

        var res_json=[];
        for(i=0; i<result.length; i++){

          if( result[i]['Summary']['Average'] < req.query.lower_bound || result[i]['Summary']['Average'] > req.query.upper_bound ){
              continue;
          }

          var ts= new Date(result[i]['Timestamp']);
          var date= ts.getDate();
          var month= ts.getMonth();
          var year= ts.getFullYear();
          var date_str = date + '/' + (parseInt(month)+1).toString() +'/' + year;
          res_json.push( {  'day':date_str, 'val':result[i]['Summary']['Average'] }  );
        }
 
           res.json({'res':res_json});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({'msg': "Internal Server Error"});
        });
};
