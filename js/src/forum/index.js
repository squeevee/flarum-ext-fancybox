/*  
 *  FancyBox Extension for Flarum
 *  Copyright (C) 2019 Eleanor Hawk
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 */

import "@fancyapps/fancybox";

import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import ModalManager from 'flarum/components/ModalManager';

function categorizeImages(element) {
  $(element).find('p > img:not([class])').each((i, e) => {
    if ($(e).parent().contents().length === 1)
      $(e).addClass('block-image');
    else
      $(e).addClass('inline-image');
  });
  $(element).find('p a:not(.block-image-link,.inline-image-link,.block-image-self-link) > img:not([class])').each((i, e) => {
    let link = $(e).parent();
    if (link.contents().length === 1
      && link.parent().contents().length === 1) {
      $(e).addClass('block-image');
      if ($(e).attr('src') !== link.attr('href')) {
        link.addClass('block-image-link');
      } else {
        link.addClass('block-image-self-link');
        return;
      }
    } else {
      $(e).addClass('inline-image');
      link.addClass('inline-image-link');
    }
    let iconWrapper = document.createElement('div');
    iconWrapper.className = 'extlink-badge';
    let icon = document.createElement('i');
    icon.className = 'fas fa-external-link-alt';
    iconWrapper.appendChild(icon);
    link.append(iconWrapper);
  });
}

app.initializers.add('fancybox', app => {
  $.fancybox.defaults.toolbar = false;
  $.fancybox.defaults.lang = app.translator.locale;
  $.fancybox.defaults.i18n[app.translator.locale] = {
    NEXT: app.translator.trans('fancybox.forum.next'),
    PREV: app.translator.trans('fancybox.forum.prev'),
    ERROR: app.translator.trans('fancybox.forum.error')
  }

  extend(CommentPost.prototype, 'config', function(x, isInitialized, context) {
    categorizeImages(this.element);
    $(this.element).find('.block-image-self-link').click((e) => e.preventDefault());
    if (!this.isEditing() && !('fancybox_gallery' in this)) {
      let images = $(this.element).find('img.inline-image,img.block-image').not('a.block-image-link *, a.inline-image-link *');
      let gallery = images.map((i, e) => {
        return {
          src: e.getAttribute('src'),
          type: 'image'
        }
      });
      this.fancybox_gallery = gallery.length ? gallery : false;
      if (this.fancybox_gallery) {
        images.each((i, e) => {
          let index = i;
          e.style.cursor = 'pointer';
          $(e).off('click.fancybox');
          $(e).on('click.fancybox', (event) => {
            $.fancybox.open(this.fancybox_gallery, {}, index);
          });
        });
      }
    } else if (this.isEditing() && 'fancybox_gallery' in this) {
      delete this.fancybox_gallery;
    }
  });

  extend(ModalManager.prototype, 'show', function (x) {
    $.fancybox.close();
  })

  if (s9e && s9e.TextFormatter) {
    extend(s9e.TextFormatter, 'preview', function(x, preview, element) {
      if (element.matches('.Post *'))
        categorizeImages(element);
    });
  }
});

