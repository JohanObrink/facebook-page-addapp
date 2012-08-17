var expect = require('chai').expect;

describe('appPageParser', function() {
	
	it('should scrape the url of the GO TO APP button', function(done) {
		
		var parser = require('../lib/appPageParser');
		parser.getAppUrl(441992625824469, function(err, result) {

			expect(result).to.equal('http://www.facebook.com/minfrukost/app_441992625824469');
			done();

		});
	
	});

});