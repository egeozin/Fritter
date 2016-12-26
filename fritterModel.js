var persist = require("./persist.js");

/*
 * Fritter Part 1
 * 6.170 Software Studio class. Oct 5, 2016. Ege Ozgirin.
 */

/* Freets model as an interface between persist.js and controller.
 *
 * @class Freets
 * @constructor
 *
 * Model Schema: 
 *
 * { freets : [{ 
 *				 text: String,
 *				 user: String
 *			  }]
 * 		 }
 *
 */ 

var Freets = function() {
	var that = Object.create(Freets.prototype);
	var users = [];
	var data = {
		"freets":[],
	}; 

	// Read from the file and populate the model, if not
	// fill with sample values.

	persist.load(function (err, data){ 
		if (err){
			persist.persist({
							  "freets":[]
			}, function (err) {
    			if (err) throw err;
    			console.log("Saved!");
			});
		} else {
			that.addData(data);
		}
	}) 

	/* 
 	 * Read the parsed data that is loaded from
	 * persist function of persist module.
 	 * @method addData
     * @param {Object} parsedData
     * @return {Void}
 	 */

	that.addData = function(parsedData){
			data = parsedData;
	}

	/* 
 	 * Adds freets to the model and writes to file.
 	 * @method addFreet
     * @param {String} freet
     * @return {Void}
 	 */

	that.addFreet = function(freet) {
		if (freet.text){
			data.freets.unshift(freet);
			persist.persist(data);
		} else {
			console.log('No empty texts please!');
		}
		
	}

	/* 
 	 * Returns all the freets.
 	 * @method getFreets
     * @return {Array} 
 	 */

	that.getFreets = function(){
        return data.freets;
	};

	/* 
 	 * Finds and deletes the freet from the database
 	 * @method deleteFreet
     * @param {Object} The freet object
     * @return {Void}
 	 */

	that.deleteFreet = function(obj){
		var ind;
		data.freets.forEach(function(e, i){
			if ( e.text === obj.text ) { ind = i };
		});
		console.log(ind);
		if (data.freets.length > 1){
			data.freets = data.freets.filter(function(e, i){return ind != i});
		} else {
			data.freets = [];
		}
		persist.persist(data);

	};

	/**
   	 * Erases all freets!
   	 * @method deleteAll
   	 */

	that.deleteAll = function(){
		data = {
			"freets":[],
			}; 
		persist.persist(data);
	}

	Object.freeze(that);
	return that;

};

module.exports = Freets();
