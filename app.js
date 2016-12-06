var express = require('express');
var app = express();
var logger = require('./logger');
var port = 8080;
app.use(logger);
app.use(express.static('public'))
app.get('/blocks', function(request, response){
	var blocks = ["Fixed", "Movable", "Rotating"]
	if(request.query.limit >=0 && request.query.limit <= blocks.length - 1){
		response.json(blocks.slice(0, request.query.limit));
	} else{
	  response.json(blocks);
	}

});
app.get('/blocks/:name', function(request, response){
	var blockObject = {
		"Fixed": "Fastened securely in position",
		"Movable": "Capable of being moved",
		"Rotating": "Hinged at center and moves in circle"
	}
	var description = blockObject[request.params.name]
	if(!description){
		response.status(404).json('No description found for'+ request.params.name)
	}else{
		response.json(blockObject[request.params.name])
	}
})
app.listen(port, function(){
	console.log("Listening on port: " + port);
});
