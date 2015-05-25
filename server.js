var net = require('net');
var request = require('./lib/request');
var url = require('url');

var server = net.createServer(function(c) { //'connection' listener
  c.on('end', function() {
  });
  c.on('data', function(data) {
    var req = request.createRequestByRequestMessage(data + '');
    var parsedUrl = url.parse(req.getUrl());
    var requestLine = req.getRequestLine();
    requestLine.url = parsedUrl.path + (parsedUrl.hash ? parsedUrl.hash : '');
    
    var client = new net.Socket();
    client.connect(80, req.getHost(), function() {
      console.log('Connected');
      
      client.write(
        Request.buildRequestLine(requestLine) + 
        '\r\n' + 
        Request.buildHeader(req.getHeaderFields()) + 
        '\r\n\r\n'
      );
    });

    client.on('data', function(data) {
      c.write(data)
      //  client.destroy(); // kill client after server's response
    });


    client.on('close', function() {
    });
  })
});
server.listen(4567, function() { //'listening' listener
});

