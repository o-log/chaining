var http = require("http");
var url = require("url");

function start(route, handle){
  console.log(handle);

  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();
  }).listen(8880);
}

exports.start = start;
