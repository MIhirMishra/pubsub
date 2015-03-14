'use strict';

var _ = require('underscore');
var model = require('../models/badges'); 
/**
*send badges to model to be saved.
**/
exports.save = function(req, res, next) {
	console.log("Inside controllers save");
  var badges = _.clone(req.body);
  _.each(badges, function(badge) {
  	console.log("\nbadge: "+badge.badge_id);
  });
  console.log("\niterated through all badges in controllers.")
  model.save(badges, function(err) {
  	console.log("\nInside controllers save callback.");
  if(err) {
  	console.log('\nGot err callback from mode save.');
  	return res.json(503, {error: true});
  } 
// model.trim();
next();
});
}
exports.send = function(req, res) {
	console.log('\n controllers send');
	var badges = _.clone(req.body);
	model.send(badges, function(err) {
		if(err) {
			console.log('\n send err out in controllers.');	
		}
		res.json(200, {error: null});
	});
};

exports.get = function(req, res) {
	model.get(function(err, data) {
		if(err)  return res.json(503, {error: true});
		res.json(200, data);
	});
};