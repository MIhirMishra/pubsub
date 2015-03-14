'use strict';
var redis = require('../lib/redis'),
broadcast = require('../lib/broadcast');
var i = 0;
exports.save = function(badges, callback) {
if(!badges.length) {
	console.log("\nall badges are saved.");
	return callback(null, null);
}
  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function(err) {	
  
  if(err) return callback(err, null);
  console.log(" i: "+ i++);
   exports.save(badges, callback);
});
};
// exports.trim = function() {
// 	redis.ltrim('badges', 0, 9);
// };

exports.send = function(badges, callback) {
	badges.forEach(broadcast.send);
	callback(null, null);
};

exports.get = function(callback) {
	redis.lrange('badges', 0, -1, function(err, data) {
		console.log("data: "+data);
		console.log('\n err: '+err);
		if (err) return callback(err, null);
			// data = data.map(JSON.parse());
			callback(null, data);
	});
};
