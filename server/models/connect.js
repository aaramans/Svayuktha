var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function(){
	console.log("[Debug info----]","Error connecting to database");
});
db.once('open', function() {
  console.log("[Debug info----]","Connected to database");
  require('../models/schema');
});

mongoose.connect('mongodb://localhost/libraryApp');
