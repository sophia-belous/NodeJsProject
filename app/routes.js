var Animal = require('./models/animal');
var Article = require('./models/article');
var Comment = require('./models/comment');
var Photo = require('./models/photo');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var mongodb = mongoose.connection;
//var shortId = require('shortid');
var fs = require('fs');

var isAuth = function(req, res, next) {
	if (!req.isAuthenticated())
		res.redirect('/login');
	else
		next();
};

module.exports = function(app, passport) {
	//login
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
	//files
	/*app.post('/api/uploads', function(req, res) {
		var filePaths = [];
		var fileKeys = Object.keys(req.files);

		fileKeys.forEach(function(key) {
    		filePaths.push(req.files[key].path.replace(/\\/g, '/').substring(6));
		});			

		res.json(filePaths);
		
	});*/
	app.post('/api/uploads', function(req, res) {
		var gfs = Grid(mongodb.db, mongoose.mongo);
		console.log(req.files);
		var is;
		var os;
		var filenames = [];
		var fileKeys = Object.keys(req.files);
		
		fileKeys.forEach(function(key) {
			//var extension = req.files[key].path.split(/[. ]+/).pop();
				is = fs.createReadStream(req.files[key].path);
				os = gfs.createWriteStream({ filename: req.files[key].filename, mode: 'w' });
				is.pipe(os);
				filenames.push(req.files[key].filename);
				os.on('close', function(file) {					
					fs.unlink(req.files[key].path, function() {
						res.end(200, file);						
					});
				});
		});
		res.json(filenames);
	});
	app.get('/api/uploads/:name', function(req, res) {
		var gfs = Grid(mongodb.db, mongoose.mongo);
		var imageStream = gfs.createReadStream({
			filename: req.params.name,
			mode: 'r'
		});
		imageStream.on('error', function(error) {
			res.send('404', 'Not found');
			return;
		});
		
		var bufs = [];
		
		imageStream.on('data', function(chunk) {
			bufs.push(chunk);		
		}).on('end', function() {		
			var fbuf = Buffer.concat(bufs);		
			var base64 = (fbuf.toString('base64'));		
			res.send(base64);
		});
	});
	app.delete('/api/uploads/:name', isAuth, function(req, res) {
		var gfs = Grid(mongodb.db, mongoose.mongo);
		gfs.remove({
			filename: req.params.name
			}, function (err) {
				if (err) return handleError(err);
				
				console.log('removed success');
			});
		});
	//photos
	app.get('/api/photos', function(req, res) {
		Photo.find(function(err, photos) {
			if (err)
				res.send(err);
				
			res.json(photos);
		});
	});
	app.post('/api/photos', function(req, res) {
		var photo = new Photo({
			img: req.body.img,
			title: req.body.title,
			text: req.body.text
		});
		
		photo.save(function(err) {
			if (err)
				res.send(err);
			
			res.json({message: 'Photo Created'});
		});
	});
	app.get('/api/photos/:photo_id', function(req, res) {
		Photo.findById(req.params.photo_id, function(err, photo) {
			if(err)
				res.send(err);
			
			res.json(photo);
		});
	});
	app.put('/api/photos/:photo_id', isAuth, function(req, res) {
		Photo.findById(req.params.photo_id, function(err, photo) {
			if(err)
				res.send(err);
			
			photo.title = req.body.title;
			photo.text = req.body.text;
			
			photo.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Photo Updated'});
			});
		});
	});
	app.delete('/api/photos/:photo_id', isAuth, function(req, res) {
		Photo.remove({
			_id: req.params.photo_id
		}, function(err, photo) {
			if(err)
				res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});
	//animals
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
	//articles
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
	//comments
	app.get('/api/comments', function(req, res) {
		Comment.find(function(err, comments) {
			if (err)
				res.send(err);
				
			res.json(comments);
		});
	});
	
	app.post('/api/comments', function(req, res) {
		var comment = new Comment({
			email: req.body.email, 
			name: req.body.name, 
			content: req.body.content, 
			date: Date.now(), 
			answer: req.body.answer	
		});
		
		comment.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Comment Created'});
		});
	});
	
	app.get('/api/comments/:comment_id', function(req, res) {
		Comment.findById(req.params.comment_id, function(err, comment) {
			if(err)
				res.send(err);
			
			res.json(comment);
		});
	});
	
	app.put('/api/comments/:comment_id', function(req, res) {
		Comment.findById(req.params.comment_id, function(err, comment) {
			if(err)
				res.send(err);
				
			comment.email = req.body.email;
			comment.name = req.body.name;
			comment.content = req.body.content; 
			comment.date = req.body.date;			
			
			comment.save(function(err) {
			if (err)
				res.send(err);
				
			res.json({message: 'Comment Updated'});
			});
		});
	});
	
	app.delete('/api/comments/:comment_id', function(req, res) {
		Comment.remove({
			_id: req.params.comment_id
		}, function(err, comment) {
			if(err)
				res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});	
	//index
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};