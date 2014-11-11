var archiver = require('archiver'),
    exec = require('child_process').exec,
    fs = require('fs'),
    mime = require('mime'),
    mkdirp = require('mkdirp'),
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
 * @param string - optional
 * @param object - optional
 *
 * @return string
 */
function _convert(path, format, outdir, options) {
    var deferred = q.defer();

    if (!options) {
      options = {};
    }

    if (!outdir) {
      outdir = '.';
    }
    else if (typeof outdir === 'object') {
      options = outdir;
      outdir = '.';
    }

    var outputFileName = _getOutputFileName(path, format);

    mkdirp(outdir, function(err, made) {
        if (err) {
          if (logLevel === 'trace') logger.error('gebo-imagemagick, mkdirp:', err);
          deferred.resolve({ error: err });
        }

        var command;
        var mimeType = mime.lookup(path);
        var pidFile = '/tmp/' + outputFileName + '.pid';

        // PDFs may produce multiple images
        if (mimeType === 'application/pdf') {
          command = 'convert -interlace none -quality 100 ' + path + ' ' + outdir + '/%0d_' + outputFileName + ' & echo $! > ' + pidFile;
        }
        else {
          command = 'convert -quality 100 ' + path + ' ' + outdir + '/' + outputFileName + ' & echo $! > ' + pidFile;
        }

        if (logLevel === 'trace') logger.info('gebo-imagemagick:', command);
        utils.setTimeLimit(options, pidFile, function(timer) { 
            exec(command, function(err, stdout, stderr) {
                utils.stopTimer(timer, options);
                if (options.timeLimit < 0) {      
                  deferred.resolve({ error: 'Sorry, that file took too long to process' });
                } 
                if (err) {
                  if (logLevel === 'trace') logger.error('gebo-imagemagick:', err);
                  deferred.resolve({ error: err });
                }
                else {
                  if (logLevel === 'trace' && stderr) logger.warn('gebo-imagemagick:', stderr);
                  fs.realpath(outdir, function(err, resolvedPath) {
                        if (err) {
                          if (logLevel === 'trace') logger.error('gebo-imagemagick, fs.realpath:', err);
                          deferred.resolve({ error: err });
                        }
                        else {
                          fs.readdir(resolvedPath, function(err, files) {
                              if (err) {
                                if (logLevel === 'trace') logger.error('gebo-imagemagick, fs.readdir:', err);
                                deferred.resolve({ error: err });
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
                                      deferred.resolve({ error: err });
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
      });

    return deferred.promise;
  };
exports.convert = _convert;


/**
 * Take the incoming filename and its extension
 * and return the hypothetical output filename
 *
 * @param string
 * @param string
 *
 * @return string
 */
function _getOutputFileName(path, extension) {
    var filename = path.split('/');
    filename = filename[filename.length - 1];
    filename = filename.split('.');

    // No extension found
    if (filename.length === 1) {
      return filename[0] + '.' + extension;
    }

    // Hidden file
    if (filename[0] === '') {
      filename = filename.slice(1);
      filename[0] = '.' + filename[0];
      if (filename.length === 1) {
        return filename[0] + '.' + extension;
      }
    }

    filename = filename.slice(0, -1);
    
    return filename + '.' + extension;
  };
exports.getOutputFileName = _getOutputFileName;

