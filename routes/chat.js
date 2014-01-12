
/*
 * GET home page.
 */

exports.show = function(req, res){
  res.render('chat', { title: 'Express-chat' });
};