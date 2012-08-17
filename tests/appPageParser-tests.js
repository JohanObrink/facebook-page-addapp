var expect = require('chai').expect;

describe('appPageParser', function() {

	var parser;

	beforeEach(function(done) {

		parser = require('../lib/appPageParser');

		require('fs').readFile(__dirname + '/app-page.html', function(err, data) {
			
			if(err) {
				throw err;
			}

			parser.getAppHtml = function(appid, callback) {
				callback(null, data);
			};

			done();
		
		});
	
	});
	
	it('should scrape the url of the GO TO APP button', function(done) {
		
		parser.getAppUrl(441992625824469, function(err, result) {

			expect(result).to.equal('http://www.facebook.com/minfrukost/app_441992625824469');
			done();

		});
	
	});

});