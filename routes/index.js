var getMenu = function(index) {
  var pages = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }, { name: 'Contact', url: '/contact/' }];
  for(var i=0; i<pages.length; i++)
    pages[i].active = (i === index);
  return pages;
}

exports.index = function(req, res) {
  res.render('index', { name: 'add-app', title: 'add-app', appId: 216538865141478, js:true, menu: getMenu(0) })
};

exports.about = function(req, res) {
  res.render('about', { name: 'add-app', title: 'about add-app', js: false, menu: getMenu(1) });
}

exports.app = function(req, res) {
  require('../lib/appPageParser').getAppUrl(req.params.id, function(err, url) {

    var body = JSON.stringify({url:url});

    res.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'application/json; charset=UTF-8' });
    res.write(body);
    res.end();
  });
};