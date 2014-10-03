var doc = require('..'),
    fs = require('fs'),
    mime = require('mime'),
    rimraf = require('rimraf');

/**
 * convert
 */
exports.convert = {

    tearDown: function(callback) {
        rimraf('/tmp/gebo-imagemagick', function() {
            callback();
          });
    },

    /**
     * Timeout stuff
     */
    'Write the imagemagick PID to a file in the output directory': function(test) {
        test.expect(1);
        doc.convert('./test/pics/gebo.png', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                try {
                  fs.openSync('/tmp/gebo.jpg.pid', 'r');
                  test.ok(true);
                }
                catch(err) {
                  test.ok(false, err);
                }
                test.done();
               }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    // How do I test this?
//    'Kill the imagemagick process if it executes longer than allowed': function(test) {
//        test.done();
//    },

    /**
     * BMP
     */
    'Convert a BMP to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', 'gif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.gif');
                try {
                  fs.closeSync(fs.openSync(path, 'r'));
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a BMP to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a BMP to an PDF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', 'pdf', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a BMP to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a BMP to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', 'tif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.tif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a BMP without an extension to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebobmp', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebobmp.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * GIF
     */
    'Convert a GIF to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.gif', 'gif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.gif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a GIF to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.gif', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a GIF to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.gif', 'pdf', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a GIF to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.gif', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a GIF to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.gif', 'tif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.tif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a GIF without a file extension to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebogif', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebogif.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * JPG
     */
    'Convert a JPG to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.jpg', 'bmp', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.bmp');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a JPG to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.jpg', 'gif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.gif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a JPG to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.jpg', 'pdf', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a JPG to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.jpg', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a JPG to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.jpg', 'tif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.tif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a JPG without a file extension to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebojpg', 'bmp', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/gebojpg.bmp');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    /**
     * PDF
     */
    'Convert a PDF to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.pdf', 'bmp', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.bmp');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.pdf', 'gif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.gif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.pdf', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.pdf', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.pdf', 'tif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.tif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF without a file extension to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebopdf', 'tif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/gebopdf.tif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * TIF
     */
    'Convert a TIF to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.tif', 'bmp', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.bmp');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a TIF to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.tif', 'gif', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.gif');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a TIF to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.tif', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a TIF to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.tif', 'pdf', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a TIF to a PNG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.tif', 'png', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/gebo.png');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    'Convert an TIF without a file extension to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebotif', 'jpg', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/gebotif.jpg');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * Multipage PDF
     */
    'Convert a multipage PDF to a BMP': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', 'bmp', '/tmp/gebo-imagemagick').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/zip');
                test.equal(path, '/tmp/gebo-imagemagick/multipage.bmp.zip');
                try {
                  var files = fs.readdirSync('/tmp/gebo-imagemagick');
                  test.equal(files.length, 5);
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


};


/**
 * getOutputFileName
 */
exports.getOutputFileName = {

    'Change the file extension to that specified': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-imagemagick/gebo.png', 'jpg');        
        test.equal(filename, 'gebo.jpg');
        filename = doc.getOutputFileName('gebo.pdf', 'png');
        test.equal(filename, 'gebo.png');
        test.done();
    },

    'Change the file extension to that specified on an infile with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-imagemagick/gebo', 'pdf');        
        test.equal(filename, 'gebo.pdf');
        filename = doc.getOutputFileName('gebo', 'png');
        test.equal(filename, 'gebo.png');
        test.done();
    },

    'Change the file extension to that specified on hidden file with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-imagemagick/.hidden', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden', 'png');        
        test.equal(filename, '.hidden.png');
        test.done();
    },

    'Change the file extension to that specified on a hidden file with an extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-imagemagick/.hidden.png', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden.pdf', 'png');        
        test.equal(filename, '.hidden.png');
        test.done();
    },

    'Should overwrite any unusual extensions': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-imagemagick/somefile.someweirdextension', 'png');        
        test.equal(filename, 'somefile.png');
        filename = doc.getOutputFileName('somefile.someweirdextension', 'png');        
        test.equal(filename, 'somefile.png');
        test.done();
    },
};
