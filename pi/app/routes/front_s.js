var front = require('../../app/controllers/front');

module.exports = function(app) {
	app.route('/auth/login').get(front.login).post(front.loginPost);
};