var net = require('net');

var client = new net.Socket();
client.connect(80, 'www.bing.com', function() {
	console.log('Connected');
	client.write('GET / HTTP/1.1\r\nUser-Agent: curl/7.35.0\r\nHost: www.bing.com\r\nAccept: */*\r\nProxy-Connection: Keep-Alive\r\n\r\n');
});
 
var sum = 0;
client.on('data', function(data) {
  sum += data.length;
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('end', function() {
  console.log('Ennnnnnnnnnnnnnnnnnnd')
})
 
client.on('close', function() {
	console.log('Connection closed');
});
