'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bower = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default: function(test) {
    test.expect(3);

    var jQueryNew = grunt.file.exists(process.cwd() + '/tmp/jquery/jquery.js'),
        jQueryUINew = grunt.file.exists(process.cwd() + '/tmp/jquery-ui/jquery-ui.custom.js'),
        jQueryUICssNew = grunt.file.exists(process.cwd() + '/tmp/jquery-ui/jquery-ui.css');

    test.ok(jQueryNew, 'jQuery should exist in the destination folder');
    test.ok(jQueryUINew, 'jQuery UI should exist in the destination folder');
    test.ok(jQueryUICssNew, 'jQuery UI CSS should exist in the destination folder');

    test.done();
  }
};
