'use strict';

var ansi = require('ansi-styles');
var should = require('should');
var sinon = require('sinon');
var withData = require('leche').withData;

var styles = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite'
];

var testData = styles.map(function(style) {
  return [ style, ansi[style].open, ansi[style].close ];
});

describe('chalksay', function() {
  var chalksay;

  beforeEach(function() {
    sinon.spy(console, 'log');
    chalksay = require('../');
  });

  afterEach(function() {
    console.log.restore();
  });

  withData(testData, function(style, ansiOpen, ansiClose) {
    it('should say things in style', function() {
      var expected = ansiOpen + 'foo' + ansiClose;
      chalksay[style]('foo');
      console.log.calledOnce.should.equal(true);
      console.log.args[0].should.have.length(1);
      console.log.args[0][0].should.eql(expected);
    });
  });
});
