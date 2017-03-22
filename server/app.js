/*jshint node:true*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var port = process.env.PORT || 4000;
var index = require('./routes/index');
var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonParser);
app.use(compress());
app.use(cors());
app.use('/', index);

console.log('About to start the node');
app.listen(port, function() {
    console.log('Environment = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
    console.log('Express server listening on port ' + port);
});
