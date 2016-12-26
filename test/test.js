var assert = require("assert");
var Freets = require('../fritterModel.js');


var beforeData = {'freets':[{'text':"Hello World!",'user':"Ege"},{'text':"Hi there!",'user':"Izgi"}]};
beforeData = JSON.stringify(beforeData);
var attemptedFreet = {'text':"This is good!",'user':"Cynthia"};
var afterData =  {'freets':[{'text':"This is good!",'user':"Cynthia"},{'text':"Hello World!",'user':"Ege"},{'text':"Hi there!",'user':"Izgi"}]};
Freets.addData(JSON.parse(beforeData.toString()));
console.log(Freets.data);

// Array is the module under test.
describe('Freets', function() {
  // indexOf is the method under test.
  describe('#addFreet()', function () {
    
    it('should add freet to the model', function () {
      assert.equal(afterData, Freets.addFreet(attemptedFreet));
    });

    it('added Freet have index of 0', function() {
      assert.equal(attemptedFreet.text, afterData.freets[0].text);
    });

  }); // End describe indexOf.

}); // End describe Array.
