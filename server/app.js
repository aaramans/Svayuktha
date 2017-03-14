/*jshint node:true*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var port = process.env.PORT || 4000;
var routes;
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(compress());
app.use(cors());

routes = require('./routes/index.js');

console.log('About to start the node');

app.post('/login', routes.signIn);
app.post('/logout', routes.signOut);
app.post('/createAdmin', jsonParser, routes.createAdmin);

app.listen(port, function() {
    console.log('Environment = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
    console.log('Express server listening on port ' + port);
});
