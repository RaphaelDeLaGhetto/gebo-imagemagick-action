var archiver = require('archiver'),
    exec = require('child_process').exec,
    fs = require('fs-extra'),
    mime = require('mime'),
    nconf = require('nconf'),
    q = require('q'),
    utils = require('gebo-utils'),
    winston = require('winston');

// Logging stuff           
nconf.file({ file: './gebo.json' });
var logLevel = nconf.get('logLevel');
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });


/**
 * Convert a given file from one format to another
 * 
 * @param string
 * @param string
 * @param object - optional
 *
 * @return string
 */
function _convert(path, outdir, options) {
    var deferred = q.defer();

    if (!outdir) {
      outdir = '.';
    }
    else if (typeof outdir === 'object') {
      options = outdir;
      outdir = '.';
    }

    var outputFileName = utils.getOutputFileName(path, options.format);

    fs.mkdirs(outdir, function(err) {
        if (err) {
          if (logLevel === 'trace') logger.error('gebo-imagemagick, fs.mkdirs:', err);
          deferred.reject(err);
        }

        var command;
        var mimeType = mime.lookup(path);

        // PDFs may produce multiple images
        if (mimeType === 'application/pdf') {
          command = 'convert -interlace none -quality 100 ' + path + ' ' + outdir + '/%0d_' + outputFileName + utils.echoPidToFile(options);
        }
        else {
          command = 'convert -quality 100 ' + path + ' ' + outdir + '/' + outputFileName + utils.echoPidToFile(options);
        }

        if (logLevel === 'trace') logger.info('gebo-imagemagick:', command);
        exec(command, function(err, stdout, stderr) {
            if (options.returnNow) {
              deferred.reject(options.returnNow);
            }
            else {
              if (logLevel === 'trace' && stderr) logger.warn('gebo-imagemagick:', stderr);
              fs.realpath(outdir, function(err, resolvedPath) {
                    if (err) {
                      if (logLevel === 'trace') logger.error('gebo-imagemagick, fs.realpath:', err);
                      deferred.reject(err);
                    }
                    else {
                      fs.readdir(resolvedPath, function(err, files) {
                          if (err) {
                            if (logLevel === 'trace') logger.error('gebo-imagemagick, fs.readdir:', err);
                            deferred.reject(err);
                          }
                          // Converting a PDF may potentially generate multiple files. I.e., one for each page.
                          if (files.length > 1) {
                            var zipFileName = resolvedPath + '/' + outputFileName + '.zip';
                            var output = fs.createWriteStream(zipFileName);
                            var archive = archiver('zip');
        
                            output.on('close', function() {
                                  if (logLevel === 'trace') logger.info('gebo-imagemagick, archiver:', archive.pointer() + ' total bytes in ' + zipFileName);
                                  deferred.resolve(zipFileName);
                              });
        
                            archive.on('error', function(err) {
                                  if (logLevel === 'trace') logger.error('gebo-imagemagick, archiver:', err);
                                  deferred.reject(err);
                              });
        
                            archive.pipe(output);
        
                            files.forEach(function(file) {
                                  archive.append(fs.createReadStream(resolvedPath + '/' + file), { name: file });
                              });
                            archive.finalize(); }
                          else {
                            deferred.resolve(resolvedPath + '/' +  files[0]);
                          }
                      });
                    }
                });
            }
          });
      });

    return deferred.promise;
  };
exports.convert = _convert;


