var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var Highscore = require('./models/highscore.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
	Authorization');
	next();
});
var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
mongoose.connect(mongo_url);

var hsRouter = express.Router();
	hsRouter.post('/highscore',function(req,res){
		console.log(req.body.name);
		var highscore = new Highscore();
		highscore.name = req.body.name;
		highscore.score = req.body.score;
		highscore.level = req.body.level;
		highscore.classSelection = req.body.classSelection;
		highscore.playtime = req.body.playtime;
		
		highscore.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'success'});
		});
	})
	.get('/highscore',function(req,res){
		Highscore.find(function(err,hs){
			if(err) res.send(err);
			res.json(hs);
		});
	});
app.use('/api',hsRouter);
app.listen(8080);
console.log('Server running on port 8080');
