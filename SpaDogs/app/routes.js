var Animal = require('./models/animal');
/*var multer = require('multer');
var fs = require('fs');*/

var isAuth = function(req, res, next) {
	if (!req.isAuthenticated())
		res.redirect('/login');
	else
		next();
};

module.exports = function(app, passport) {
	
	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});
	
	app.get('/logout', isAuth, function(req, res) {		
		req.logOut();
		res.redirect('/pets');
		res.send("logged out", 401);		
	});
	
	app.post('/login', passport.authenticate('login'), function(req, res) {
		res.send(req.user);
	});
	
	app.post('/signup', passport.authenticate('signup'), function(req, res) {
		res.send(req.user);
	});
	
	app.post('/api/uploads', function(req, res) {
		console.log(req.body)
		console.log(req.files)
		res.send('ok');
		
	});
	app.get('/api/animals', function(req, res) {
		Animal.find(function(err, animals) {
			if (err)
				res.send(err);
				
			res.json(animals);
		});
	});
	app.post('/api/animals', isAuth, function(req, res) {
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
	app.put('/api/animals/:animal_id', isAuth, function(req, res) {
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
	app.delete('/api/animals/:animal_id', isAuth, function(req, res) {
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