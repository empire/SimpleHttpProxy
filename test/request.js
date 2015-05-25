var assert = require("assert")
var expect = require("chai").expect;
var request = require('../lib/request')

describe('Request', function(){
  describe('#parseRequestLine()', function(){
    it('should extract parts', function() {
      var out = request.parseRequestLine('GET http://bing.com/ HTTP/1.1')
      expect(out).deep.equal({
        method: 'GET',
        url: 'http://bing.com/',
        revision: 'HTTP/1.1'
      });
    })
  })
  describe('#parseHeaders', function() {
    it('should return empty array if header is not set', function() {
      var out = request.parseHeaders('')
      expect(out).deep.equal([]);
    })
    it('should build headers fields', function() {
      var fields = request.parseHeaders('Host: abc\nCache-Control: no-cache')
      expect(fields).deep.equal([
        ["Host", "abc"],
        ["Cache-Control", "no-cache"]
      ])
    })
    it('should accept duplicate keys', function() {
      var fields = request.parseHeaders('a: 1\na: 2\na: 3')
      expect(fields).deep.equal([
        ['a', '1'],
        ['a', '2'],
        ['a', '3']
      ])
    })
  })
})

