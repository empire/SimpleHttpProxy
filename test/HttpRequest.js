var assert = require("assert")
var expect = require("chai").expect;
var request = require('../lib/http/Request').Request
var sinon = require('sinon')

describe('Request', function(){
  describe('#getUrl()', function() {
    it('should get url', function() {
      var request = new Request();
      request.setRequestLine({
        method: 'GET',
        url: 'http://www.google.com/?q=abc',
        revision: 'HTTP/1.1'
      })
      
      expect(request.getUrl()).deep.equal('http://www.google.com/?q=abc');
    })
  })
  describe('#getHost()', function() {
    it('should get host from header fields', function() {
      var request = new Request();
      request.setHeaderFields([
        ['User-Agent', 'curl/7.35.0'],
        ['Host', 'www.google.com'],
        ['Accept', '*/*'],
        ['Proxy-Connection', 'Keep-Alive']
      ])
      
      expect(request.getHost()).equal('www.google.com');
    })
  })
  describe('#buildHeader()', function() {
    it('should join header fields and build http request header', function() {
      var header = Request.buildHeader([
        ['User-Agent', 'curl/7.35.0'],
        ['Host', 'www.google.com'],
        ['Accept', '*/*'],
        ['Proxy-Connection', 'Keep-Alive']
      ])
      
      expect(header).equal('User-Agent: curl/7.35.0\r\nHost: www.google.com\r\nAccept: */*\r\nProxy-Connection: Keep-Alive');
    })
  })
  describe('#buildRequestLine()', function() {
    it('should join request line and build first line of http request header', function() {
      var line = Request.buildRequestLine({
        method: 'GET',
        url: '/?q=abc',
        revision: 'HTTP/1.1'
      })
      
      expect(line).equal('GET /?q=abc HTTP/1.1');
    })
  })
})
