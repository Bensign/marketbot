var rp = require('request-promise');

var Stock = function () {};

// Log the ticker
Stock.prototype.log = function () {
    console.log(this.ticker);
}

// Determine if the stock exists
Stock.prototype.exists = function (){

	rp("http://www.google.com/finance/info?q=" + this.ticker).then(function(res){
		console.log("WWOOP");
		return true;
	}).catch(function(err){
		return false;
	});

}

module.exports = Stock;