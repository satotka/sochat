
/*
 * GET home page.
 */

exports.show = function (req, res) {
    res.render('chat', {title: 'Simple Chat'});
};

exports.m_show = function (req, res) {
    res.render('m_chat', {title: 'Simple Chat'});
};
