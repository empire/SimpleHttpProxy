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
  var fields = _.filter(header.split(/[\r\n]+/))

  return _.map(fields, function(field) {
    var parts = field.split(':')
    var trimed = _.map(parts, _.trim);

    return trimed
  });
}

