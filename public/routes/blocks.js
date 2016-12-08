var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var blocks = {
		"Fixed": {"status":"Fastened securely in position",
					"location": "first floor"},
		"Movable": {"status":"Capable of being moved",
					"location": "second floor"},
		"Rotating": {"status":"Hinged at center and moves in circle",
					"location": "third floor"}
	}

router.route('/')
	.get(function(request, response){
		var blockObject = Object.keys(blocks)
		if(request.query.limit >=0 && request.query.limit <= blockObject.length - 1){
			response.json(blockObject.slice(0, request.query.limit));
		} else{
		  response.json(blockObject);
		}

	})
	.post(parseUrlEncoded, function(request, response){
		var newBlock = request.body;
		var name = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
		blocks[name] = {
			"status": newBlock.status,
			"location": newBlock.location
		}
		response.status(201).json(Object.keys(blocks))

	})
router.route('/:name')
	.all(function(request, response, next){
		var paramName = request.params.name
		var CasedParamName = paramName[0].toUpperCase() + paramName.slice(1).toLowerCase()
		request.blockName = CasedParamName;
		next();
	})
	.delete(function(request, response){
		delete blocks[request.blockName]
		response.status(200).json(Object.keys(blocks))
		//response.sendStatus  will send OK in json 
	})
router.route('/location/:name')
	.all(function(request, response, next){
		var paramName = request.params.name
		var CasedParamName = paramName[0].toUpperCase() + paramName.slice(1).toLowerCase()
		request.blockName = CasedParamName;
		next();
	})
	.get(function(request, response){
		var description = blocks[request.blockName]
		if(!description){
			response.status(404).json("No description found for "+ paramName)
		}else{
			response.json(description["location"])
		}
	})
router.route('/status/:name')
	.all(function(request, response, next){
		var paramName = request.params.name
		var CasedParamName = paramName[0].toUpperCase() + paramName.slice(1).toLowerCase()
		request.blockName = CasedParamName;
		next();
	})
	.get(function(request, response){
		var description = blocks[request.blockName]
		if(!description){
			response.status(404).json('No description found for'+ request.params.name)
		}else{
			response.json(description["status"])
		}
	})

module.exports = router;