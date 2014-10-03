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
        fs.createReadStream('./test/pics/multipage.pdf').pipe(fs.createWriteStream('/tmp/multipage.pdf'));
        callback();
    },

    tearDown: function(callback) {
        fs.unlinkSync('/tmp/gebo.bmp');
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

    /**
     * Multipage PDF
     */
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

