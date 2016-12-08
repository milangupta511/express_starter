var express = require('express');
var app = express();

var logger = require('./logger');
var port = 8080;
app.use(express.static('public'))
app.use(logger);

var blocksRoute = require('./public/routes/blocks');
app.use('/blocks', blocksRoute);

app.listen(port, function(){
	console.log("Listening on port: " + port);
});
