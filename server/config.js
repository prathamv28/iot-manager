module.exports = {
  fetchFreq: 15000, // (in ms)
  genFreq: 4000,   // (in ms)
  heartbeat: 2000, // (in ms)
  server: {
    host: "http://localhost",
    port: 8080,
    db: {
      host: "localhost:27017"
    }
  },
  devices: [
    {
      host: "http://localhost",
      deviceId: 0,
      port: 8081,
      location: "Kanpur",
      sensorTypes: ["Temperature","Humidity","Pressure"],
      db: {
        host: "localhost:27018"
      }
    },
    {
      host: "http://localhost",
      port: 8082,
      deviceId: 1,
      location: "Lucknow",
      sensorTypes: ["Temperature","Pressure"],
      db: {
        host: "localhost:27019"
      }
    }

  ]
}
