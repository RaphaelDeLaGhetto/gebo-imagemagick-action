var doc = require('../../lib'),
    fs = require('fs-extra'),
    mime = require('mime');

/**
 * convert
 */
exports.convert = {

    tearDown: function(callback) {
        fs.remove('/tmp/gebo-imagemagick', function() {
            callback();
          });
    },

    /**
     * Timeout stuff
     */
    'Write the imagemagick PID to a file in the /tmp directory': function(test) {
        test.expect(1);

        var options = { format: 'jpg', pidFile: '/tmp/file.pid' };
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', options).
            then(function(path) {
                try {
                  fs.openSync('/tmp/file.pid', 'r');
                  test.ok(true);
                }
                catch(err) {
                  test.ok(false, err);
                }

                fs.remove('/tmp/center.png');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    // This doesn't actually time out. The option is set by the gebo-server
    'Return error if options.returnNow is set to true': function(test) {
        test.expect(1);
        var options = { pidFile: '/tmp/file.pid', returnNow: 'Sorry, that file took too long to process' };
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', options).
            then(function(path) {
                test.ok(false, 'This should throw an error');
                test.done();
              }).
            catch(function(err) {
                test.equal(err, 'Sorry, that file took too long to process');
                test.done();
              });
    },

    /**
     * BMP
     */
    'Convert a BMP to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.bmp', '/tmp/gebo-imagemagick', { format: 'gif' }).
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
        doc.convert('./test/pics/gebo.bmp', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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
        doc.convert('./test/pics/gebo.bmp', '/tmp/gebo-imagemagick', { format: 'pdf' }).
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
        doc.convert('./test/pics/gebo.bmp', '/tmp/gebo-imagemagick', { format: 'png' }).
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
        doc.convert('./test/pics/gebo.bmp', '/tmp/gebo-imagemagick', { format: 'tif' }).
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
        doc.convert('./test/pics/gebobmp', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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
        doc.convert('./test/pics/gebo.gif', '/tmp/gebo-imagemagick', { format: 'gif' }).
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
        doc.convert('./test/pics/gebo.gif', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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
        doc.convert('./test/pics/gebo.gif', '/tmp/gebo-imagemagick', { format: 'pdf' }).
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
        doc.convert('./test/pics/gebo.gif', '/tmp/gebo-imagemagick', { format: 'png' }).
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
        doc.convert('./test/pics/gebo.gif', '/tmp/gebo-imagemagick', { format: 'tif' }).
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
        doc.convert('./test/pics/gebogif', '/tmp/gebo-imagemagick', { format: 'png' }).
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
        doc.convert('./test/pics/gebo.jpg', '/tmp/gebo-imagemagick', { format: 'bmp' }).
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
        doc.convert('./test/pics/gebo.jpg', '/tmp/gebo-imagemagick', { format: 'gif' }).
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
        doc.convert('./test/pics/gebo.jpg', '/tmp/gebo-imagemagick', { format: 'pdf' }).
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
        doc.convert('./test/pics/gebo.jpg', '/tmp/gebo-imagemagick', { format: 'png' }).
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
        doc.convert('./test/pics/gebo.jpg', '/tmp/gebo-imagemagick', { format: 'tif' }).
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
        doc.convert('./test/pics/gebojpg', '/tmp/gebo-imagemagick', { format: 'bmp' }).
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
        doc.convert('./test/pics/gebo.pdf', '/tmp/gebo-imagemagick', { format: 'bmp' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/0_gebo.bmp');
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
        doc.convert('./test/pics/gebo.pdf', '/tmp/gebo-imagemagick', { format: 'gif' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/gif');
                test.equal(path, '/tmp/gebo-imagemagick/0_gebo.gif');
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
        doc.convert('./test/pics/gebo.pdf', '/tmp/gebo-imagemagick', { format: 'jpg' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/jpeg');
                test.equal(path, '/tmp/gebo-imagemagick/0_gebo.jpg');
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
        doc.convert('./test/pics/gebo.pdf', '/tmp/gebo-imagemagick', { format: 'png' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/png');
                test.equal(path, '/tmp/gebo-imagemagick/0_gebo.png');
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
        doc.convert('./test/pics/gebo.pdf', '/tmp/gebo-imagemagick', { format: 'tif' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/tiff');
                test.equal(path, '/tmp/gebo-imagemagick/0_gebo.tif');
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
        doc.convert('./test/pics/gebopdf', '/tmp/gebo-imagemagick', { format: 'tif' }).
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
     * PNG
     */
    'Convert a PNG to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', { format: 'bmp' }).
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

    'Convert a PNG to a GIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', { format: 'gif' }).
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

    'Convert a PNG to a JPG': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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

    'Convert a PNG to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', { format: 'pdf' }).
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

    'Convert a PNG to a TIF': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebo.png', '/tmp/gebo-imagemagick', { format: 'tif' }).
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

    'Convert an extensionless PNG to a BMP': function(test) {
        test.expect(3);
        doc.convert('./test/pics/gebopng', '/tmp/gebo-imagemagick', { format: 'bmp' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'image/bmp');
                test.equal(path, '/tmp/gebo-imagemagick/gebopng.bmp');
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
        doc.convert('./test/pics/gebo.tif', '/tmp/gebo-imagemagick', { format: 'bmp' }).
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
        doc.convert('./test/pics/gebo.tif', '/tmp/gebo-imagemagick', { format: 'gif' }).
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
        doc.convert('./test/pics/gebo.tif', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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
        doc.convert('./test/pics/gebo.tif', '/tmp/gebo-imagemagick', { format: 'pdf' }).
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
        doc.convert('./test/pics/gebo.tif', '/tmp/gebo-imagemagick', { format: 'png' }).
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
        doc.convert('./test/pics/gebotif', '/tmp/gebo-imagemagick', { format: 'jpg' }).
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
    'Convert a multipage PDF to a collection of BMPs': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', '/tmp/gebo-imagemagick', { format: 'bmp' }).
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

    'Convert a multipage PDF to a collection of GIFs ': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', '/tmp/gebo-imagemagick', { format: 'gif' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'application/zip');
                test.equal(path, '/tmp/gebo-imagemagick/multipage.gif.zip');
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

    'Convert a multipage PDF to a collection of JPGs ': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', '/tmp/gebo-imagemagick', { format: 'jpg' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'application/zip');
                test.equal(path, '/tmp/gebo-imagemagick/multipage.jpg.zip');
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

    'Convert a multipage PDF to a collection of PNGs ': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', '/tmp/gebo-imagemagick', { format: 'png' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'application/zip');
                test.equal(path, '/tmp/gebo-imagemagick/multipage.png.zip');
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

    'Convert a multipage PDF to a collection of TIFs ': function(test) {
        test.expect(4);
        doc.convert('./test/pics/multipage.pdf', '/tmp/gebo-imagemagick', { format: 'tif' }).
            then(function(path) {
                test.equal(mime.lookup(path), 'application/zip');
                test.equal(path, '/tmp/gebo-imagemagick/multipage.tif.zip');
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


