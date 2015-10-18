module.exports = function(app) {
	
	var Animal = require('./models/animal');
	
	module.exports = function(app) {
		app.get('api/animals', function(req, res) {
			Animal.find(function(err, animals) {
				if (err)
					res.send(err);
					
				res.json(animals);
			});
		});
	};
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};