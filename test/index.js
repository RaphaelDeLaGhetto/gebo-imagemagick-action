'use strict';

var actionModule = require('..'),
    fs = require('fs'),
    nconf = require('nconf');

var DOMAIN = nconf.get('domain');

/**
 * convert image
 */
exports.convert = {

    setUp: function(callback) {
        fs.createReadStream('./test/pics/gebo.bmp').pipe(fs.createWriteStream('/tmp/gebo.bmp'));
//        fs.createReadStream('./test/pics/gebo.gif').pipe(fs.createWriteStream('/tmp/gebo.gif'));
//        fs.createReadStream('./test/pics/gebo.jpg').pipe(fs.createWriteStream('/tmp/gebo.jpg'));
//        fs.createReadStream('./test/pics/gebo.pdf').pipe(fs.createWriteStream('/tmp/gebo.pdf'));
//        fs.createReadStream('./test/pics/gebo.png').pipe(fs.createWriteStream('/tmp/gebo.png'));
//        fs.createReadStream('./test/pics/gebo.tif').pipe(fs.createWriteStream('/tmp/gebo.tif'));
//        fs.createReadStream('./test/pics/gebobmp').pipe(fs.createWriteStream('/tmp/gebobmp'));
//        fs.createReadStream('./test/pics/gebogif').pipe(fs.createWriteStream('/tmp/gebogif'));
//        fs.createReadStream('./test/pics/gebojpg').pipe(fs.createWriteStream('/tmp/gebojpg'));
//        fs.createReadStream('./test/pics/gebopdf').pipe(fs.createWriteStream('/tmp/gebopdf'));
//        fs.createReadStream('./test/pics/gebotif').pipe(fs.createWriteStream('/tmp/gebotif'));
//        fs.createReadStream('./test/pics/multipage.pdf').pipe(fs.createWriteStream('/tmp/multipage.pdf'));
        callback();
    },

    tearDown: function(callback) {
        fs.unlinkSync('/tmp/gebo.bmp');
//        fs.unlinkSync('/tmp/gebo.gif');
//        fs.unlinkSync('/tmp/gebo.jpg');
//        fs.unlinkSync('/tmp/gebo.pdf');
//        fs.unlinkSync('/tmp/gebo.tif');
//        fs.unlinkSync('/tmp/gebobmp');
//        fs.unlinkSync('/tmp/gebogif');
//        fs.unlinkSync('/tmp/gebojpg');
//        fs.unlinkSync('/tmp/gebopdf');
//        fs.unlinkSync('/tmp/gebotif');
//        fs.unlinkSync('/tmp/multipage.pdf');
        callback();
    },

    /**
     * BMP
     */
//    'Convert BMP to a GIF and return raw data': function(test) {
//        test.expect(4);
//        actionModule.actions.convert({ resource: 'convert',
//                                       execute: 'true',
//                                     },
//                                     { content: { format: 'gif', raw: true },
//                                       file: { 
//                                            path: '/tmp/gebo.bmp',
//                                            originalname: 'my.bmp',
//                                            type: 'image/bmp', 
//                                            size: 968970,
//                                       },
//              }).
//            then(function(pic) {
//                test.equal(mime.lookup(pic.filePath), 'image/gif');
//                test.equal(pic.filePath, fs.realpathSync('./public/gebo.bmp/my.gif'));
//                test.equal(pic.fileName, 'my.gif');
//                try {
//                  fs.closeSync(fs.openSync(pic.filePath, 'r'));
//                  rimraf.sync('./public/gebo.bmp');
//                  test.ok(true);
//                }
//                catch (err) {
//                  test.ok(false, err);
//                }
//                test.done();
//              }).
//            catch(function(err) {
//                test.ok(false, err);
//                test.done();
//              });
//    },

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

