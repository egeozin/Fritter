var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var FreetSchema = mongoose.Schema({
	poster: {type: String, required: true, index: true},
	text: String,
	refreet_poster: {type: String, required: false, index: true},
	isRefreet: {type:Boolean, default:false},
	created_at: {type: Date, default: Date.now, index: true}
});


FreetSchema.methods.getDescription = function(callback) {
  return this.text;
};


var formatFreets = function(f){
	return {
		_id: f._id,
		isRefreet: f.isRefreet,
		poster: f.refreet_poster,
		user: f.poster,
		text: f.text
	};
}

FreetSchema.statics.getFreets = function(res){
	var that = this;
	that.find({}, function(err, freets){
			if (err){
				console.log("I'm here");
				res.json({
					'success':false,
					'message':"Freets can't be fetched"
				});
			} else {
				console.log("I would like to be here");
				res.json({
					'success':true,
					'freets': freets.map(formatFreets)
					});
				}
			})
};

var FreetModel = mongoose.model("Freet", FreetSchema);

module.exports = FreetModel;