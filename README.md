gebo-imagemagick
================

An ImageMagick-dependent gebo action image converter

# ImageMagick

Version 6.7.7-10 was already installed in my Ubuntu 14.04 distribution. I have found, however that unit
tests pass inconsistently, especially when converting BMPs to PNGs or GIFs. The following command will
install version 6.7.7-10 (as of 2014-10-4). It appears to work even though the tests report errors.

```
sudo apt-get install imagemagick
```

## Compiling from source

Compiling the source seems to eliminate the BMP-to-GIF errors, though the PNGs remain when testing
the library functions exclusively. When all tests are run, the problems disappear.

```
sudo apt-get remove imagemagick
```

To install the current 6.8.9-8 from source:

```
sudo -i
cd
apt-get install build-essential checkinstall && apt-get build-dep imagemagick -y
wget http://www.imagemagick.org/download/ImageMagick-6.8.9-8.tar.gz
tar xvf ImageMagick-6.8.9-8.tar.gz
cd ImageMagick-6.8.9-8/
./configure --prefix=/opt/imagemagick-6.8 && make
checkinstall
ln -s /opt/imagemagick-6.8/bin/animate /usr/bin/
ln -s /opt/imagemagick-6.8/bin/compare /usr/bin/
ln -s /opt/imagemagick-6.8/bin/composite /usr/bin/
ln -s /opt/imagemagick-6.8/bin/conjure /usr/bin/
ln -s /opt/imagemagick-6.8/bin/convert /usr/bin/
ln -s /opt/imagemagick-6.8/bin/display /usr/bin/
ln -s /opt/imagemagick-6.8/bin/identify /usr/bin/
ln -s /opt/imagemagick-6.8/bin/import /usr/bin/
ln -s /opt/imagemagick-6.8/bin/mogrify /usr/bin/
ln -s /opt/imagemagick-6.8/bin/montage /usr/bin/
ln -s /opt/imagemagick-6.8/bin/stream /usr/bin/
```

To remove:

```
dpkg -r imagemagick-6.8.9
```

# Install

```
sudo npm install gebo-imagemagick
```

# Configure gebo.json

The maximum allowable processing time is set in gebo.json:

```
{
    ...
    "imagemagick": {
        "timeout": 20000
    }
    ...
}
```

# Enable

```
var gebo = require('gebo-server')();
gebo.enable(require('gebo-imagemagick'));
``` 

# Test

```
sudo nodeunit test
```

