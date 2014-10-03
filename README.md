gebo-imagemagick
================

An ImageMagick-dependent image converter

# ImageMagick

This was already installed in my Ubuntu 14.04 distribution. If not, 

```
sudo apt-get install imagemagick
```

There have been reports as recently as 2014-5-23 that ImageMagick is not included in the repository for Ubuntu 14.04.
See (http://askubuntu.com/questions/471045/14-04-doesnt-have-package-imagemagick)[http://askubuntu.com/questions/471045/14-04-doesnt-have-package-imagemagick].

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

# Test

```
sudo nodeunit test
```

