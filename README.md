# FancyBox Extension for Flarum

Image formatting and lightbox modal using FancyBox.

For more information about FancyBox, see: https://fancyapps.com/fancybox

## Features

 - Clicking on an image in a post launches the FancyBox modal. This allows users to zoom in on the image, pan around, and navigate among multiple images on the same post as a gallery.
- Images are displayed with formatting to normalize sizes and layout.
- If the author of the post has wrapped the image in a link, it will be shown as an external link. (Clicking on the image will not launch the FancyBox modal in this case.)

Note: this extension does not generate thumbnails. The storage location of images, and the file size / bandwidth usage are not affected.

## Usage

### Image layouts

Image layouts can be controlled by the formatting of the post's markup (e.g., its BBCode or Markdown).

An image is "stand-alone" if it is not in a paragraph with any text or other images, i.e., it is separated from text or other images by at least two returns. A stand-alone image is displayed in large format.

![Example of a stand-alone image](https://i.imgur.com/k7Epp0T.png)

An image is "inline" if it is in a paragraph with text or other images. An inline image is displayed in small format, in order to fit into the flow of text.

![Example of an inline image](https://i.imgur.com/xLKwRhn.png)

(For technical reasons, an image is considered inline if it is separated from text or another image by only one return.)

### Image links

As mentioned under Features, if an image is wrapped in a link, its behavior and appearance are altered. Most notably, in order to preserve the link, clicking on the image opens the link instead of opening the image in the FancyBox modal. Images within links are also not added to the FancyBox gallery for a post.

As an indicator of this altered behavior, images in links have a visible margin and an external link icon. Stand-alone images in links are displayed smaller than usual.

![Example of a standalone image wrapped in a link](https://i.imgur.com/EctH1KT.png)

Note that, if desired, text may also be placed *within* the same link as an image, as well as multiple images. This, of course, will cause the image to be inline rather than stand-alone. 

![Example of an inline image wrapped in a link with some text](https://i.imgur.com/oFiDXCr.png)

## Installation

Install this extension with Composer using the command

```
composer require squeevee/flarum-ext-fancybox
```

## Support

This extension is currently in beta. To report a bug, please open an issue on the GitHub repo:

https://github.com/squeevee/flarum-ext-fancybox

## License

This extension is licensed under GPLv3. This extension is not affiliated with
or endorsed by the makers of FancyBox.
