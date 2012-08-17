
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'add-app', appId: 216538865141478 })
};