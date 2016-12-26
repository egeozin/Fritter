var express = require('express');
var router = express.Router();
var helper = require('./router_helper');
var Freet = require('../model/freet');
var User = require('../model/user');



router.get('/', function(req, res){
	res.redirect('/freets');
})

router.get('/freets', function(req, res){
	name = req.query.name;
	if (req.session.name){
		if(name){
			helper.getAllPostablesOfUser(name, req.session.name, res);
		} else {
		helper.getAllPostablesOfUser(req.session.name, req.session.name, res);
		}
	} else {
		res.json({
			'success':false,
			'message':'signup-login page'
 		});

	}
});

router.get('/allFreets', function(req, res){
	if (req.session.name){
		console.log("Am I here?");
		Freet.getFreets(res);
	} else {
		res.json({
			'success':false,
			'message':'These are all the freets'
 		});

	}
});



router.post('/signup', function(req, res, next) {
	var signupPost = req.body;
	var userToAdd = {name: signupPost.username, password: signupPost.password};
	User.create(userToAdd,
		function(err, record){
			if(err){
				res.json({
					'success': false,
					'message': 'Either the username or password has wrong characters or a user already exists with given credentials!'
				});
			} else {
			req.session.name = signupPost.username;
			req.session.save();
			User.update({'_id':record._id}, {$push:{'subscribing': record._id}}, function(err, record){
				if(err) {
					console.log(err);
					res.json({
						'success':false,
						'message':'update is unsuccessful!'
					});
				}
				res.json({
					'success':true,
					'info': record
				});
			});
		}	
	});
		
});



router.post('/login', function(req, res, next) {
	var loginPost = req.body;
	User.findOne({name:loginPost.username, password:loginPost.password}, 'name' /*'name'*/, function(err, user){
		if(user){
			console.log('success router login!');
			req.session.name = loginPost.username;
			req.session.save();
			helper.getAllPostablesOfUser(user.name, req.session.name, res);
			} else if(user === null){
				message = 'No user found';
				res.json({
					'success': false,
					'message': message
				});
			
			} else {
				console.log(err);
				res.json({
					'success': false,
					'message': "There are no users matching with the given information"
				});
			}
		})
});



router.post('/freet', function(req, res, next) {
	var userPost = req.body;
	var name = req.session.name;
	var date = new Date(); 
	User.findOne({name: name}, function(err, user){
		if (err){
			console.log(err);
			res.json({
				'success':false,
				'message':"Can't find user"
			});
		}
		Freet.create({poster:user.name, text:userPost.content, created_at:date}, function(err, result){
			if (err){
			} else {
				console.log('success in updating the Freets of this user!');
				res.json({
					'success':true,
					'freet':[result].map(formatFreets)
					});
			}
		});

	});

})
	

router.post('/refreet', function(req, res, next) {
	var reFreet = req.body;
	if (req.session.name != reFreet.name) {
		Freet.findOne({'_id':reFreet._id}, function(err, freet){
		if (err){
			console.log(err);
		} else {
		console.log('success in finding the freet to be refreeted!');
		var name = req.session.name; 
		var date = new Date();
		Freet.create({poster:req.session.name, text:freet.text, refreet_poster:freet.poster, isRefreet: true, created_at:date}, function(err, refreet){
			if (err) {
				console.log(err);
				res.json({
					'success': false,
					'message': "Can't find the freet!"
				});
			} else {
				console.log('success in adding a reFreet to the Postables of the session user!');
				res.json({
					'success': true,
					'refreet': [refreet].map(formatFreets)
				});
			}
		});
	}
	})
	} else {
		res.json({
			'success': false,
			'message': "Users can't refreet their own freets"
		});

	}

});


router.post('/follow', function(req, res, next) {
	var user= req.session.name;
	var followedUser = req.body.toBeFollowed;
	User.subscribeTo(user, followedUser, function(err, result){
		if(err) {
			res.json({
				'success': false,
				'message': 'Error occured during search'
			})
		}
		res.json({
			'success': true,
		})
	})
});



router.delete('/freets', function(req, res, next){
	if(req.body.reposter) {
		if(req.session.name == req.body.reposter) {
			Freet.findOne({'_id':req.body._id}).remove().exec(function(err){
				if (!err){
					console.log('success in deleting from this collection!');
					helper.getAllPostablesOfUser(req.session.name, req.session.name, res);
				} else {
					console.log(err);
					console.log("Can't write in this format!");
				}
			});
		} else {
			res.json({
				'err':"You can not delete this tweet!"
			});
		}} else {
			if(req.session.name == req.body.name) {
				Freet.findOne({'_id':req.body._id}).remove().exec(function(err){
					if (!err){
						console.log('success in deleting from this collection!');
						helper.getAllPostablesOfUser(req.session.name, req.session.name, res);
					} else {
						console.log(err);
						console.log("Can't write in this format!");
					}
				});
				} else {
					res.json({
						'err':"You can not delete this tweet!"
					});
				}}
});


var formatFreets = function(f){
	return {
		_id: f._id,
		isRefreet: f.isRefreet,
		poster: f.refreet_poster,
		user: f.poster,
		text: f.text
	};
}

var formatUsers = function(us){
	//return {poster:u.name};
	return {name:us.name};
}

router.get('/users', function (req, res) {
	User.find({}, function(err, users){
		if (err){
			console.log(err);
		}
		res.json({
			'success': true,
			'users': users.map(formatUsers)
		})
	});
});

router.get('/users/:name', function (req, res) {
	var name = req.params.name;
	helper.getAllPostablesOfUser(name,req.session.name,res);
});


module.exports = router;
