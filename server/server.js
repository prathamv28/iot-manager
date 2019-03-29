var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the server' });
});

app.use('/', router);

app.listen(port);
console.log('Server listening on ' + port);
