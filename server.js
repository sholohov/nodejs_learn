var http = require('http');
var url = require('url');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res) {
	var urlParsed = url.parse(req.url);

	switch (urlParsed.pathname) {
		case '/':
			sendFile("index.html", res);
			break;

		case '/subscribe':
			chat.subscribe(req, res);
			break;

		case '/publish':
			chat.publish("...");
			break;

		default:
			res.statusCode = 404;
			res.end("Not found");
	}

}).listen(3000);


function sendFile(fileName, res) {
	var fileStream = fs.createReadStream(fileName);
	fileStream
		.on('error', function() {
			res.statusCode = 500;
			res.end("Server error");
		})
		.pipe(res)
		.on('close', function() {
			fileStream.destroy();
		});
}