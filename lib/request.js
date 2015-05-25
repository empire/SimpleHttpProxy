exports = module.exports = {}

var _ = require('lodash')

// (?<method>GET|POST|DELETE|PUT)\s+(?<url>(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)))\s+(?<revision>http\/\d\.\d)

exports.parseRequestLine = function(line)
{
  var parts = line.split(/\s+/)
  return {
    method: parts[0],
    url: parts[1],
    revision: parts[2]
  };
}

exports.parseHeaders = function(header)
{
  var fields = _.filter(header.split(/\r\n/))

  return _.map(fields, function(field) {
    var parts = field.split(':')
    var trimed = _.map(parts, _.trim);

    return trimed
  });
}

exports.Request = Request = function() 
{}

Request.prototype.setRequestLine = function(line) 
{
  this.line = line;
}

Request.prototype.setHeaderFields = function(fields) 
{
  this.fields = fields;
}

exports.createRequestByRequestMessage = function(message) 
{
  var headerAndBody = message.split('\r\n\r\n');
  var header = headerAndBody[0];
  var body = headerAndBody[1];
  
  var posOfFirstLine = header.indexOf('\r\n') + 2;
  var requestLine = header.substr(0, posOfFirstLine);
  var headerFields = header.substr(posOfFirstLine);
  
  return this.createRequestByParams(this.parseRequestLine(requestLine), this.parseHeaders(headerFields), body);
}

exports.createRequestByParams = function(requestLine, headerFields, requestBody)
{
  var request = new this.Request();
  request.setRequestLine(requestLine);
  request.setHeaderFields(headerFields);
  
  return request;
}
