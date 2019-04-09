module.exports = {
  server: {
    port: 8080,
    db: {
      host: "localhost:27017"
    }
  },
  devices: [
    {
      port: 8081,
      id: "dev1",
      location: "loc1",
      sensorTypes: [1,2,3],
      db: {
        host: "localhost:27018"
      }
    },
    {
      port: 8082,
      id: "dev2",
      location: "loc2",
      sensorTypes: [2,3,4],
      db: {
        host: "localhost:27019"
      }
    }

  ]
}
