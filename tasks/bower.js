/*
 * grunt-bower-installer
 * https://github.com/nicknisi/grunt-bower-installer
 *
 * Copyright (c) 2013 Nick Nisi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    function installSources(component, bowerrc) {
        var path = require('path'),
            sources = component.install.sources,
            dest = component.install.path,
            componentDir = bowerrc.directory;
        grunt.util._.forEach(sources, function (file, source) {
            var srcPath = process.cwd() + '/'+ componentDir + '/' + source + '/',
                destPath = process.cwd() + '/' + dest + '/' + source + '/',
                files = grunt.file.expand({cwd: srcPath}, file);

            files.forEach(function (file) {
                var filename = path.basename(file);
                grunt.log.writeln('writing ' + srcPath + file + ' to ' + destPath + filename);
                grunt.file.copy(srcPath + file, destPath + filename);
            });
        });
    }

    grunt.registerMultiTask('bower', 'install needed source files from bower components', function() {
        var bower = require('bower'),
            done = this.async(),
            startPath = process.cwd() + '/',
            bowerrc = grunt.file.exists(startPath + '/.bowerrc') ? grunt.file.readJSON(startPath + '/.bowerrc') : {json: 'bower.json', directory: 'components'},
            component = grunt.file.readJSON(bowerrc && bowerrc.json ? startPath + bowerrc.json : startPath + 'bower.json');

        grunt.log.writeln('running bower install task');
        bower.commands.install()
            .on('data', function (message) {
                grunt.log.writeln(message);
            })
            .on('end', function () {
                grunt.log.writeln('bower install complete');
                installSources(component, bowerrc);
                done();
            });
    });
};
