var assert = require("assert")
var expect = require("chai").expect;
var request = require('../lib/request')
var multiline = require('multiline');
var sinon = require('sinon')

describe('request', function(){
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
      var fields = request.parseHeaders('Host: abc\r\nCache-Control: no-cache')
      expect(fields).deep.equal([
        ["Host", "abc"],
        ["Cache-Control", "no-cache"]
      ])
    })
    it('should accept duplicate keys', function() {
      var fields = request.parseHeaders('a: 1\r\na: 2\r\na: 3')
      expect(fields).deep.equal([
        ['a', '1'],
        ['a', '2'],
        ['a', '3']
      ])
    })
  })
  describe('#createRequestByRequestMessage', function() {
    before(function(done) {
      sinon
        .stub(request, 'parseRequestLine');
      sinon
        .stub(request, 'parseHeaders');
      sinon
        .stub(request, 'createRequestByParams');
      done();
    });

    after(function(done) {
      request.parseRequestLine.restore();
      request.parseHeaders.restore();
      request.createRequestByParams.restore();
      done();
    });

    it('should able to parse request message', function(done) {
      var requestLine = {
        method: 'GET',
        url: 'HTTP://bing.com/',
        revision: 'HTTP/1.1'
      };
      var headerFields = [
        ['User-Agent', 'curl/7.35.0'],
        ['Host', 'bing.com'],
        ['Accept', '*/*'],
        ['Proxy-Connection', 'Keep-Alive']
      ];
      var createRequestResult = {sample: true};
      
      request.parseRequestLine.returns(requestLine);
      request.parseHeaders.returns(headerFields);
      request.createRequestByParams.returns(createRequestResult);
     
      var out = request.createRequestByRequestMessage('GET HTTP://bing.com/ HTTP/1.1\r\nUser-Agent: curl/7.35.0\r\nHost: bing.com\r\nAccept: */*\r\nProxy-Connection: Keep-Alive\r\n\r\nBody')
      expect(request.parseRequestLine.called).to.be.true;
      expect(request.parseRequestLine.args[0][0]).equal('GET HTTP://bing.com/ HTTP/1.1\r\n');

      expect(request.parseHeaders.called).to.be.true;
      expect(request.parseHeaders.args[0][0]).equal('User-Agent: curl/7.35.0\r\nHost: bing.com\r\nAccept: */*\r\nProxy-Connection: Keep-Alive');

      expect(request.createRequestByParams.called).to.be.true;
      expect(request.createRequestByParams.args[0]).deep.equal([requestLine, headerFields, 'Body']);
      
      expect(out).deep.equal(createRequestResult);
      done();
    })
  })
  describe('#createRequestByParams', function() {
    it('should build request', function(done) {
      var requestLine = {
        method: 'GET',
        url: 'HTTP://bing.com/',
        revision: 'HTTP/1.1'
      };
      var headerFields = [
        ['User-Agent', 'curl/7.35.0'],
        ['Host', 'bing.com'],
        ['Accept', '*/*'],
        ['Proxy-Connection', 'Keep-Alive']
      ];
      
      var result = request.createRequestByParams(requestLine, headerFields, 'Sample Body');
      
      expect(result.getRequestLine()).deep.equal(requestLine);
      expect(result.getHeaderFields()).deep.equal(headerFields);
      expect(result.getBody()).deep.equal('Sample Body');
      
      done();
    })
  })
})
