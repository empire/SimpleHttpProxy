var _ = require('lodash')

exports = module.exports = {}
  
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

Request.prototype.setBody = function(body) 
{
  this.body = body;
}

Request.prototype.getRequestLine = function() 
{
  return _.clone(this.line, true);
}

Request.prototype.getHeaderFields = function() 
{
  return _.clone(this.fields, true);
}

Request.prototype.getBody = function() 
{
  return this.body;
}

Request.prototype.getUrl = function()
{
  return this.line.url;
}

Request.prototype.getHost = function()
{
  return _.find(this.fields, function(field) { return field[0] == 'Host'; })[1];
}

Request.buildHeader = function(fields)
{
  return _.map(fields, function(field) { return field[0] + ': ' + field[1]; }).join('\r\n');
}

Request.buildRequestLine = function(line)
{
  return [line.method, line.url, line.revision].join(' ');
}
