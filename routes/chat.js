
/*
 * GET home page.
 */

exports.show = function(req, res){
  res.render('chat', { title: 'Express-chat' });
};

exports.realshow = function(req, res){
  res.render('realchat', { title: 'Express- real chat' });
};