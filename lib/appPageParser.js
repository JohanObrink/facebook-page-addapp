module.exports.getAppUrl = function(appid, callback) {

	var options = {
		host: 'www.facebook.com',
		port: 443,
		path: '/apps/application.php?id=441992625824469',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.75 Safari/537.1'
		}
	};

	var cheerio = require('cheerio');

	require('https').get(options, function(res) {

		var html = '';

		res.on('data', function(data) {
			html += data;
		});

		res.on('end', function() {

			var $ = cheerio.load(html);
			var selector = 'a.uiButton.uiButtonConfirm.uiButtonLarge';

			callback(null, $(selector).attr('href'));
		});

	}).on('error', function(e) {
		callback(e);
	});

}