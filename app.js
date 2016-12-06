var express = require('express')
var app = express();
var port = 8080
app.use(express.static('public'))
app.get('/blocks', function(request, response){
	var blocks = ["Fixed", "Movable", "Rotating"]
	response.json(blocks);

})
app.listen(port, function(){
	console.log("Listening on port: " + port);
});