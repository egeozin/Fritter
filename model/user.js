var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;



var UserSchema = mongoose.Schema({
	name: {type: String, unique:true}, 
	password: {type: String, unique:true},
	subscribing:[{type:ObjectId, ref:"User", required:false}]
});

UserSchema.path('name').validate(function(value, done) {
	var that = this;
    that.model('User').count({ name: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If count is greater than zero, "invalidate"
        done(!count);
    });
}, 'Username already exists');


UserSchema.path("name").validate(function(value) {
	return /^[a-zA-Z0-9._-]/.test(value)},"Wrong characters!");


UserSchema.methods.getDescription = function(callback) {
  return this.name;
};



UserSchema.statics.getUsers = function(callback) {
	var that = this;
	that.find({},'name', function(err, users){
		if (err){
			callback(err);
		} else {
			callback(null, users);
		}
	});
};


UserSchema.pre("save",function(next, done) {
    var that = this;
    mongoose.models["User"].findOne({name:that.name},function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
        	console.log('results', results);
            that.invalidate("username","username must be unique");
            next(new Error("username must be unique"));
        } else {
            next();
        }
    });
});

//TODO


UserSchema.statics.subscribeTo = function(user, followed, callback){
	var that = this;
	that.findOne({'name':followed}, function(err, doc){
		if(err){
			callback(err);
		}
		console.log(doc);
		that.update({name:user}, {$addToSet:{'subscribing':doc._id}}, function(err, doc){
			if(err){
				callback(err);
			}
			console.log(doc);
			callback(null, doc);
		});
	});
};

var UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;


/*
UserSchema.path("name").validate(function(value){
	return /^[a-zA-Z0-9._-]/.test(value);
}, "Invalid Username!");
*/
