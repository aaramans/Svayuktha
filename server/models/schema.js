var mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

var statusValues = ['active', 'inactive', 'archived' , 'blocked'];
var roleValues = ['admin', 'user'];

exports.User = mongoose.model('User', new mongoose.Schema({
	uId: {type:String, index: { unique: true }, required: true},
	firstname: {type:String, required: true},
	lastname: {type:String, required: true},
	username: {type:String, index: { unique: true }, required: true},
	email: {type: String, index: { unique: true }, required: true },
	password: {type:String, required: true},
	role: {type:String, enum: {values : roleValues}, required:true},
	address: {type:String, required:true},
	mobile: {type:String, required:true},
	avatarUrl: {type:String, default: ''},
	status: {type:String, enum: {values : statusValues}},
	accessToken: {type:String, default:''},
	created: {type: Date, default: Date.now },
	updated: {type: Date, default: Date.now }
}).plugin(autoIncrement.mongoosePlugin,{
    collection: 'User',
    field: 'uId',
    step: 1
}));
