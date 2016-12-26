var express = require('express');
var Freet = require('../model/freet');
var User = require('../model/user');


/* 
 * Populates subscribed users array of a specific user, returns names to target freets associated with the users.
 * @method getAllPostablesOfUser
 * @param {String} username 
 * @param {String} session_name
 * @param {Object} res
 * @return {Object}
 */

var getAllPostablesOfUser = function(username, session_name, res) {
	User.findOne({"name":username}).populate('subscribing').select('subscribing').exec(function (err, user){
		User.find({'_id': {$in: user.subscribing}}).select('name').exec(function(err, usernames){
			Freet.find({'poster': {$in: usernames.map(formatUsernames)}}).sort({created_at:'desc'}).exec(function(err, freets){
				if(err){
					res.json({
						'success': false,
						'message': "There are no freets matching the given information"
					});
				}
				res.json({
					'success':true,
					'name':session_name,
					'freets': freets.map(formatFreets)
					});
			})

		});
	});
};


var formatUsernames = function(u){
	//return {poster:u.name};
	return u.name;
}

var formatFreets = function(f){
	return {
		_id: f._id,
		isRefreet: f.isRefreet,
		poster: f.refreet_poster,
		user: f.poster,
		text: f.text
	};
}



module.exports = {
	formatUsernames: formatUsernames,
	formatFreets: formatFreets,
	getAllPostablesOfUser:getAllPostablesOfUser
};