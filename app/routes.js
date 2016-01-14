var Animal = require('./models/animal');
var Article = require('./models/article');

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
		//console.log(req.body);
		console.log(req.files);
		var filePaths = [];
		var fileKeys = Object.keys(req.files);

		fileKeys.forEach(function(key) {
    		filePaths.push(req.files[key].path.replace(/\\/g, '/').substring(6));
		});			

		res.json(filePaths);
		
	});
	app.get('/api/animals', function(req, res) {
		Animal.find(function(err, animals) {
			if (err)
				res.send(err);
				
			res.json(animals);
		});
	});
	app.post('/api/animals', isAuth, function(req, res) {
		var animal = new Animal({
			name: req.body.name,
			jender: req.body.jender,
			color: req.body.color,
			birthday: req.body.birthday,
			description: req.body.description,
			photos: req.body.photos			
		});
		
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
			animal.jender = req.body.jender;
			animal.color = req.body.color;
			animal.birthday = req.body.birthday;
			animal.description = req.body.description;
			
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
	
	app.get('/api/articles', function(req, res) {
		Article.find(function(err, articles) {
			if (err)
				res.send(err);
				
			res.json(articles);
		});
	});
	
	app.post('/api/articles', isAuth, function(req, res) {
		var article = new Article({
			title: req.body.title, 
			date: req.body.date, 
			shortDesc: req.body.shortDesc, 
			description: req.body.description, 
			photo: req.body.photo		
		});
		
		article.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Article Created'});
		});
	});
	
	app.get('/api/articles/:article_id', function(req, res) {
		Article.findById(req.params.article_id, function(err, article) {
			if(err)
				res.send(err);
			
			res.json(article);
		});
	});
	
	app.put('/api/articles/:article_id', isAuth, function(req, res) {
		Article.findById(req.params.article_id, function(err, article) {
			if(err)
				res.send(err);
				
			article.title = req.body.title;
			article.date = req.body.date;
			article.shortDesc = req.body.shortDesc; 
			article.description = req.body.description;			
			
			article.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Article Updated'});
			});
		});
	});
	
	app.delete('/api/articles/:article_id', function(req, res) {
		Article.remove({
			_id: req.params.article_id
		}, function(err, article) {
			if(err)
				res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});	
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};