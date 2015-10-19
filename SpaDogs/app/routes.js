var Animal = require('./models/animal');

module.exports = function(app) {
	app.get('/api/animals', function(req, res) {
		Animal.find(function(err, animals) {
			if (err)
				res.send(err);
				
			res.json(animals);
		});
	});
	app.post('/api/animals', function(req, res) {
		var animal = new Animal();
		animal.name = req.body.name;
		
		animal.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Animal Created'});
		});
	});
	app.get('/api/animals/:animal_id', function(req, res) {
		Animal.findById(req.params.animal_id, function(err, animal) {
			if(err)
				res.send(err);
			
			res.json(animal);
		});
	});
	app.put('/api/animals/:animal_id', function(req, res) {
		Animal.findById(req.params.animal_id, function(err, animal) {
			if(err)
				res.send(err);
			
			animal.name = req.body.name;
			
			animal.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Animal Updated'});
			});
		});
	});
	app.delete('/api/animals/:animal_id', function(req, res) {
		Animal.remove({
			_id: req.params.animal_id
		}, function(err, animal) {
			if(err)
				res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};