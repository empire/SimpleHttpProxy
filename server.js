var net = require('net');
var request = require('./lib/request');

var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    var req = request.createRequestByRequestMessage(data + '');
    console.log(req)
  })
});
server.listen(4567, function() { //'listening' listener
  console.log('server bound');
});

