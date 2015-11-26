var front = require('../../app/controllers/front');

module.exports = function(app) {
		app.route('/alarmbox').get(front.accueil);
		app.route('/').get(front.quatrecentquatre);
};