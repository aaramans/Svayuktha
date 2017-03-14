/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var port = process.env.PORT || 4545;
var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static('./client/'));
app.use(express.static('./'));
app.use(express.static('./client/assets/css'));
app.use('/*', express.static('./client/index.html'));

app.listen(port, function() {
    console.log('process.cwd = ' + process.cwd());
    console.log('n__dirname = ' + __dirname);
    console.log('env = ' + app.get('env'));
    console.log('Express server listening on port ' + port);
});
