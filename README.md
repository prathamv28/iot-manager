# IOT Manager
Course project for CS315 (Principles of Database Systems)

### Pre-requisites
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  
* docker

### Setting up 
``` 
git clone https://github.com/prathamv28/iot-manager
cd iot-manager
npm install
npm install -g yarn 
docker pull mongo (to pull docker image of mongoDB)
```

### Running
* First start atleast two mongo containers: one for main server and one for a device
```
docker run --name maindb -p 27017:27017 -d mongo
docker run --name dev1db -p 27018:27017 -d mongo
```

Check that above two containers are running using `docker ps`.

* Start off the main server
```
node server/server.js
```

* Start off the device
```
node server/device.js 0
```

**NOTE**: If you want to add more devices:
* Add device configuration in the devices list of file `config.js`
* Start more mongo container (at port say 27019)
* Start off the device `node server/device.js {Device Index in the list}`

* Start off the sensor simulation to generate data
```
node server/sensorSimulate.js
```

* Start client
```
yarn start:dev
```
Now go to `localhost:4200` in the browser.
