'use strict';

var actionModule = require('..'),
    fs = require('fs'),
    mime = require('mime'),
    nconf = require('nconf'),
    rimraf = require('rimraf');

var DOMAIN = nconf.get('domain');

/**
 * convert image
 */
exports.convert = {

    setUp: function(callback) {
        fs.createReadStream('./test/pics/gebo.bmp').pipe(fs.createWriteStream('/tmp/gebo.bmp'));
        fs.createReadStream('./test/pics/gebo.gif').pipe(fs.createWriteStream('/tmp/gebo.gif'));
        fs.createReadStream('./test/pics/gebo.jpg').pipe(fs.createWriteStream('/tmp/gebo.jpg'));
        fs.createReadStream('./test/pics/gebo.pdf').pipe(fs.createWriteStream('/tmp/gebo.pdf'));
        fs.createReadStream('./test/pics/gebo.png').pipe(fs.createWriteStream('/tmp/gebo.png'));
        fs.createReadStream('./test/pics/gebo.tif').pipe(fs.createWriteStream('/tmp/gebo.tif'));
        fs.createReadStream('./test/pics/gebobmp').pipe(fs.createWriteStream('/tmp/gebobmp'));
        fs.createReadStream('./test/pics/gebogif').pipe(fs.createWriteStream('/tmp/gebogif'));
        fs.createReadStream('./test/pics/gebojpg').pipe(fs.createWriteStream('/tmp/gebojpg'));
        fs.createReadStream('./test/pics/gebopdf').pipe(fs.createWriteStream('/tmp/gebopdf'));
        fs.createReadStream('./test/pics/gebopng').pipe(fs.createWriteStream('/tmp/gebopng'));
        fs.createReadStream('./test/pics/gebotif').pipe(fs.createWriteStream('/tmp/gebotif'));
        fs.createReadStream('./test/pics/multipage.pdf').pipe(fs.createWriteStream('/tmp/multipage.pdf'));
        callback();
    },

    tearDown: function(callback) {
        fs.unlinkSync('/tmp/gebo.bmp');
        fs.unlinkSync('/tmp/gebo.gif');
        fs.unlinkSync('/tmp/gebo.jpg');
        fs.unlinkSync('/tmp/gebo.pdf');
        fs.unlinkSync('/tmp/gebo.png');
        fs.unlinkSync('/tmp/gebo.tif');
        fs.unlinkSync('/tmp/gebobmp');
        fs.unlinkSync('/tmp/gebogif');
        fs.unlinkSync('/tmp/gebojpg');
        fs.unlinkSync('/tmp/gebopdf');
        fs.unlinkSync('/tmp/gebopng');
        fs.unlinkSync('/tmp/gebotif');
        fs.unlinkSync('/tmp/multipage.pdf');
        callback();
    },

    /**
     * BMP
     */
    'Convert BMP to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.bmp',
                                            originalname: 'my.bmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/gif');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.gif'));
                test.equal(pic.fileName, 'my.gif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                           path: '/tmp/gebo.bmp',
                                           originalname: 'my.bmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.bmp/my.gif');
                try {
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.bmp',
                                            originalname: 'my.bmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.jpg'));
                test.equal(pic.fileName, 'my.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebo.bmp',
                                           originalname: 'my.bmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.bmp/my.jpg');
                try {
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.bmp',
                                            originalname: 'my.bmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.pdf'));
                test.equal(pic.fileName, 'my.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebo.bmp',
                                           originalname: 'my.bmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.bmp/my.pdf');
                try {
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.bmp',
                                            originalname: 'my.bmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.png'));
                test.equal(pic.fileName, 'my.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebo.bmp',
                                           originalname: 'my.bmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.bmp/my.png');
                try {
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.bmp',
                                            originalname: 'my.bmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.tif'));
                test.equal(pic.fileName, 'my.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert BMP to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebo.bmp',
                                           originalname: 'my.bmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.bmp/my.tif');
                try {
                  rimraf.sync('./public/gebo.bmp');
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

    'Convert an extensionless BMP to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebobmp',
                                            originalname: 'mybmp',
                                            type: 'image/bmp', 
                                            size: 968970,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebobmp/mybmp.tif'));
                test.equal(pic.fileName, 'mybmp.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebobmp');
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

    'Convert an extensionless BMP to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebobmp',
                                           originalname: 'mybmp',
                                           type: 'image/bmp', 
                                           size: 968970,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebobmp/mybmp.tif');
                try {
                  rimraf.sync('./public/gebobmp');
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
    'Convert GIF to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.gif',
                                            originalname: 'my.gif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.gif/my.bmp'));
                test.equal(pic.fileName, 'my.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebo.gif',
                                           originalname: 'my.gif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.gif/my.bmp');
                try {
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.gif',
                                            originalname: 'my.gif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.gif/my.jpg'));
                test.equal(pic.fileName, 'my.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebo.gif',
                                           originalname: 'my.gif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.gif/my.jpg');
                try {
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.gif',
                                            originalname: 'my.gif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.gif/my.pdf'));
                test.equal(pic.fileName, 'my.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebo.gif',
                                           originalname: 'my.gif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.gif/my.pdf');
                try {
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.gif',
                                            originalname: 'my.gif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.gif/my.png'));
                test.equal(pic.fileName, 'my.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebo.gif',
                                           originalname: 'my.gif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.gif/my.png');
                try {
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.gif',
                                            originalname: 'my.gif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.gif/my.tif'));
                test.equal(pic.fileName, 'my.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.gif');
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

    'Convert GIF to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebo.gif',
                                           originalname: 'my.gif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.gif/my.tif');
                try {
                  rimraf.sync('./public/gebo.gif');
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

    'Convert an extensionless GIF to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebogif',
                                            originalname: 'mygif',
                                            type: 'image/gif', 
                                            size: 11949,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebogif/mygif.tif'));
                test.equal(pic.fileName, 'mygif.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebogif');
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

    'Convert an extensionless GIF to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebogif',
                                           originalname: 'mygif',
                                           type: 'image/gif', 
                                           size: 11949,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebogif/mygif.tif');
                try {
                  rimraf.sync('./public/gebogif');
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
    'Convert JPG to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.jpg',
                                            originalname: 'my.jpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.jpg/my.bmp'));
                test.equal(pic.fileName, 'my.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebo.jpg',
                                           originalname: 'my.jpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.jpg/my.bmp');
                try {
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.jpg',
                                            originalname: 'my.jpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/gif');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.jpg/my.gif'));
                test.equal(pic.fileName, 'my.gif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                           path: '/tmp/gebo.jpg',
                                           originalname: 'my.jpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.jpg/my.gif');
                try {
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.jpg',
                                            originalname: 'my.jpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.jpg/my.pdf'));
                test.equal(pic.fileName, 'my.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebo.jpg',
                                           originalname: 'my.jpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.jpg/my.pdf');
                try {
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.jpg',
                                            originalname: 'my.jpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.jpg/my.png'));
                test.equal(pic.fileName, 'my.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebo.jpg',
                                           originalname: 'my.jpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.jpg/my.png');
                try {
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.jpg',
                                            originalname: 'my.jpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.jpg/my.tif'));
                test.equal(pic.fileName, 'my.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert JPG to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebo.jpg',
                                           originalname: 'my.jpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.jpg/my.tif');
                try {
                  rimraf.sync('./public/gebo.jpg');
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

    'Convert an extensionless JPG to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebojpg',
                                            originalname: 'myjpg',
                                            type: 'image/jpeg', 
                                            size: 12837,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebojpg/myjpg.png'));
                test.equal(pic.fileName, 'myjpg.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebojpg');
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

    'Convert an extensionless JPG to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebojpg',
                                           originalname: 'myjpg',
                                           type: 'image/jpeg', 
                                           size: 12837,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebojpg/myjpg.png');
                try {
                  rimraf.sync('./public/gebojpg');
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
    'Convert PDF to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.pdf/my.bmp'));
                test.equal(pic.fileName, 'my.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebo.pdf',
                                           originalname: 'my.pdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.pdf/my.bmp');
                try {
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/gif');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.pdf/my.gif'));
                test.equal(pic.fileName, 'my.gif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                           path: '/tmp/gebo.pdf',
                                           originalname: 'my.pdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.pdf/my.gif');
                try {
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.pdf/my.jpg'));
                test.equal(pic.fileName, 'my.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebo.pdf',
                                           originalname: 'my.pdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.pdf/my.jpg');
                try {
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.pdf/my.png'));
                test.equal(pic.fileName, 'my.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebo.pdf',
                                           originalname: 'my.pdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.pdf/my.png');
                try {
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.pdf/my.tif'));
                test.equal(pic.fileName, 'my.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert PDF to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebo.pdf',
                                           originalname: 'my.pdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.pdf/my.tif');
                try {
                  rimraf.sync('./public/gebo.pdf');
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

    'Convert an extensionless PDF to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebopdf',
                                            originalname: 'mypdf',
                                            type: 'application/pdf',
                                            size: 31120,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebopdf/mypdf.jpg'));
                test.equal(pic.fileName, 'mypdf.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebopdf');
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

    'Convert an extensionless PDF to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebopdf',
                                           originalname: 'mypdf',
                                           type: 'application/pdf', 
                                           size: 31120,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebopdf/mypdf.jpg');
                try {
                  rimraf.sync('./public/gebopdf');
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
    'Convert PNG to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.png',
                                            originalname: 'my.png',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.png/my.bmp'));
                test.equal(pic.fileName, 'my.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebo.png',
                                           originalname: 'my.png',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.png/my.bmp');
                try {
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.png',
                                            originalname: 'my.png',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/gif');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.png/my.gif'));
                test.equal(pic.fileName, 'my.gif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                           path: '/tmp/gebo.png',
                                           originalname: 'my.png',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.png/my.gif');
                try {
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.png',
                                            originalname: 'my.png',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.png/my.jpg'));
                test.equal(pic.fileName, 'my.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebo.png',
                                           originalname: 'my.png',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.png/my.jpg');
                try {
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.png',
                                            originalname: 'my.png',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.png/my.pdf'));
                test.equal(pic.fileName, 'my.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebo.png',
                                           originalname: 'my.png',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.png/my.pdf');
                try {
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a TIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.png',
                                            originalname: 'my.png',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/tiff');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.png/my.tif'));
                test.equal(pic.fileName, 'my.tif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.png');
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

    'Convert PNG to a TIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'tif' },
                                       file: { 
                                           path: '/tmp/gebo.png',
                                           originalname: 'my.png',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.png/my.tif');
                try {
                  rimraf.sync('./public/gebo.png');
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

    'Convert an extensionless PNG to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebopng',
                                            originalname: 'mypng',
                                            type: 'image/png', 
                                            size: 40297,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebopng/mypng.bmp'));
                test.equal(pic.fileName, 'mypng.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebopng');
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

    'Convert an extensionless PNG to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebopng',
                                           originalname: 'mypng',
                                           type: 'image/png', 
                                           size: 40297,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebopng/mypng.bmp');
                try {
                  rimraf.sync('./public/gebopng');
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
    'Convert TIF to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.tif',
                                            originalname: 'my.tif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/bmp');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.tif/my.bmp'));
                test.equal(pic.fileName, 'my.bmp');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                           path: '/tmp/gebo.tif',
                                           originalname: 'my.tif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.tif/my.bmp');
                try {
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.tif',
                                            originalname: 'my.tif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/gif');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.tif/my.gif'));
                test.equal(pic.fileName, 'my.gif');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                           path: '/tmp/gebo.tif',
                                           originalname: 'my.tif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.tif/my.gif');
                try {
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a JPG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.tif',
                                            originalname: 'my.tif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/jpeg');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.tif/my.jpg'));
                test.equal(pic.fileName, 'my.jpg');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a JPG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'jpg' },
                                       file: { 
                                           path: '/tmp/gebo.tif',
                                           originalname: 'my.tif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.tif/my.jpg');
                try {
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.tif',
                                            originalname: 'my.tif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.tif/my.pdf'));
                test.equal(pic.fileName, 'my.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebo.tif',
                                           originalname: 'my.tif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.tif/my.pdf');
                try {
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a PNG and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png', raw: true },
                                       file: { 
                                            path: '/tmp/gebo.tif',
                                            originalname: 'my.tif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'image/png');
                test.equal(pic.filePath, fs.realpathSync('./public/gebo.tif/my.png'));
                test.equal(pic.fileName, 'my.png');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebo.tif');
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

    'Convert TIF to a PNG and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'png' },
                                       file: { 
                                           path: '/tmp/gebo.tif',
                                           originalname: 'my.tif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebo.tif/my.png');
                try {
                  rimraf.sync('./public/gebo.tif');
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

    'Convert an extensionless TIF to a PDF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf', raw: true },
                                       file: { 
                                            path: '/tmp/gebotif',
                                            originalname: 'mytif',
                                            type: 'image/tiff', 
                                            size: 969276,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/pdf');
                test.equal(pic.filePath, fs.realpathSync('./public/gebotif/mytif.pdf'));
                test.equal(pic.fileName, 'mytif.pdf');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/gebotif');
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

    'Convert an extensionless TIF to a PDF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'pdf' },
                                       file: { 
                                           path: '/tmp/gebotif',
                                           originalname: 'mytif',
                                           type: 'image/tiff', 
                                           size: 969276,
                                      },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/gebotif/mytif.pdf');
                try {
                  rimraf.sync('./public/gebotif');
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
    'Convert multipage PDF to a BMP and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp', raw: true },
                                       file: { 
                                            path: '/tmp/multipage.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf', 
                                            size: 118075,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/zip');
                test.equal(pic.filePath, fs.realpathSync('./public/multipage.pdf/my.bmp.zip'));
                test.equal(pic.fileName, 'my.bmp.zip');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/multipage.pdf');
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

    'Convert multipage PDF to a BMP and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'bmp' },
                                       file: { 
                                            path: '/tmp/multipage.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf', 
                                            size: 118075,
                                       },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/multipage.pdf/my.bmp.zip');
                try {
                  rimraf.sync('./public/multipage.pdf');
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

    'Convert multipage PDF to a GIF and return raw data': function(test) {
        test.expect(4);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif', raw: true },
                                       file: { 
                                            path: '/tmp/multipage.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf', 
                                            size: 118075,
                                       },
              }).
            then(function(pic) {
                test.equal(mime.lookup(pic.filePath), 'application/zip');
                test.equal(pic.filePath, fs.realpathSync('./public/multipage.pdf/my.gif.zip'));
                test.equal(pic.fileName, 'my.gif.zip');
                try {
                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
                  rimraf.sync('./public/multipage.pdf');
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

    'Convert multipage PDF to a GIF and return a link': function(test) {
        test.expect(2);
        actionModule.actions.convert({ resource: 'convert',
                                       execute: 'true',
                                     },
                                     { content: { format: 'gif' },
                                       file: { 
                                            path: '/tmp/multipage.pdf',
                                            originalname: 'my.pdf',
                                            type: 'application/pdf', 
                                            size: 118075,
                                       },
              }).
            then(function(link) {
                test.equal(link, DOMAIN + '/multipage.pdf/my.gif.zip');
                try {
                  rimraf.sync('./public/multipage.pdf');
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
     * Reject
     */
    'Reject an agent with inadequate permission': function(test) {
        test.expect(1);
        actionModule.actions.convert({ resource: 'hello' }, {}).
            then(function(link) {
                test.ok(false, 'Shouldn\'t get here');
                test.done();
              }).
            catch(function(err) {
                test.equal(err, 'You are not permitted to request or propose that action');
                test.done();
              });
    },
};

