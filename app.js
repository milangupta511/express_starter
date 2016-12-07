var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});
var logger = require('./logger');
var port = 8080;
app.use(logger);
app.use(express.static('public'))
var blocks = {
		"Fixed": {"status":"Fastened securely in position",
					"location": "first floor"},
		"Movable": {"status":"Capable of being moved",
					"location": "second floor"},
		"Rotating": {"status":"Hinged at center and moves in circle",
					"location": "third floor"}
	}
app.param('name', function(request, response, next){
	var paramName = request.params.name
	var CasedParamName = paramName[0].toUpperCase() + paramName.slice(1).toLowerCase()
	request.blockName = CasedParamName;
	next();
})
app.get('/blocks', function(request, response){
	var blockObject = Object.keys(blocks)
	if(request.query.limit >=0 && request.query.limit <= blockObject.length - 1){
		response.json(blockObject.slice(0, request.query.limit));
	} else{
	  response.json(blockObject);
	}

});
app.post('/blocks', parseUrlEncoded, function(request, response){
	var newBlock = request.body;
	var name = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
	blocks[name] = {
		"status": newBlock.status,
		"location": newBlock.location
	}
	console.log(blocks)
	response.status(201).json(Object.keys(blocks))

})
app.get('/blocks/location/:name', function(request, response){
	var description = blocks[request.blockName]
	if(!description){
		response.status(404).json("No description found for "+ paramName)
	}else{
		response.json(description["location"])
	}
})
app.get('/blocks/status/:name', function(request, response){
	var description = blocks[request.blockName]
	if(!description){
		response.status(404).json('No description found for'+ request.params.name)
	}else{
		response.json(description["status"])
	}
})
app.listen(port, function(){
	console.log("Listening on port: " + port);
});
