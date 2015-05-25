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
  return this.line;
}

Request.prototype.getHeaderFields = function() 
{
  return this.fields;
}

Request.prototype.getBody = function() 
{
  return this.body;
}