var express = require("express");
require('env.js');

var twit = require("twitter"),
	twitter = new twit({
		consumer_key: process.env.CONSUMER_KEY,
		consumer_secret: process.env.CONSUMER_SECRET,
		access_token_key: process.env.ACCESS_TOKEN_KEY,
		access_token_secret: process.env.ACCESS_TOKEN_SECRET
	});

var app = express();
var path = require('path');

app.set('port', process.env.PORT || 2400);
app.set('views', './views');
app.set('view engine', 'jade');

function home(req, res){
	res.setHeader("Content-Type", 'text/html');
	res.render('index');
}

function results(req,res){
	var tweets = [],
	util = require('util');

		twitter.stream('statuses/filter', {track:req.body.hashtag}, function(stream){
			stream.on('data', function(data){
				if ('delete' in data === false){
					tweets.push(data);
				}
			});

			setTimeout(function(){
				console.log('Collected ' + tweets.length + ' tweets.');
				stream.destroy();
				res.setHeader("Content-Type", 'text/html');
				res.render('results', {tweetsi: JSON.stringify(tweets)});
			}, 3000);
		});

	
}

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static(__dirname + '/public'));


app.get('/', home);
app.post('/', results)
app.listen(app.get('port'));

console.log('Server running at 2400');