'use strict';

var fs = require('fs'),
    lib = require('../lib'),
    mime = require('mime'),
    nconf = require('nconf'),
    q = require('q'),
    winston = require('winston');

module.exports = function() {

    nconf.file({ file: './gebo.json' });
    // Logging stuff
    var logLevel = nconf.get('logLevel');
    var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });

    // For producing the download URL
    var domain = nconf.get('domain');

    /**
     * Convert an image or PDF from one format to another
     * 
     * @param Object
     * @param Object
     * 
     * @return promise
     */
    exports.convert = function(verified, message) {
        var deferred = q.defer();

        if (verified.admin || verified.execute) {

          var destDir = './public/' + message.file.path.split('/').pop();
          lib.convert(message.file.path, message.content.format, destDir).
            then(function(path) {

                // Respect the original file name
                var filename = lib.getOutputFileName(message.file.originalname, message.content.format);

                if (mime.lookup(path) === 'application/zip')  {
                  filename += '.zip';
                }
 
                var newPath = path.split('/');
                newPath.pop();
                newPath.push(filename);
                newPath = newPath.join('/');

                fs.rename(path, newPath, function(err) {
                    if (err) {
                      if (logLevel === 'trace') logger.error('fs.rename:', err);
                      deferred.resolve({ error: err });
                    }

                    if (message.content.raw) {
                      deferred.resolve({ filePath: newPath, fileName: filename });
                    }
                    else {
                      deferred.resolve(domain + '/' + message.file.path.split('/').pop() + '/' + filename);
                    }
                  });
              }).
            catch(function(err) {
                deferred.resolve({ error: err });
              });
        }
        else {
          deferred.reject('You are not permitted to request or propose that action');
        }

        return deferred.promise;
      };

    return exports;
  };
