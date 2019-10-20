
var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// var fortunes = [

// 	"Conquer your fears or they will conquer your",
// 	"Rivers need springs",
// 	"Do not fear what you dont know",
// 	"You will have a pleasant surprise",
// 	"Whenever possible, keep it simple",


// ];

var fortune = require('./lib/fortune.js');

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {

	// response.type('text/plain');
	// response.send('Meadowlark Travel');

	response.render('home');

});

app.get('/about', function(request, response){

	// response.type('text/plain');
	// response.send('About Meadowlark Travel');

	// var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	// response.render('about', { fortune: randomFortune });
	response.render('about', { fortune: fortune.getFortune() });
})


app.use(function(request, response){

	// response.type('text/plain');
	response.status(404);
	// response.send('404 -Not Found');
	response.render('404');

});


app.use(function(err, request, response, next){

	console.error(err.stack);
	// response.type('text/plain');
	response.status(500);
	// response.send('500 - Server Error');
	response.render('500');
});



app.listen(app.get('port'), function(){

	console.log('Express started on http://localhost:' + app.get('port') + '; press Crtl - C to terminate. ');
});