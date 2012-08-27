var localeIndicator = newNode('a', {
    'href': '#',
    'style': ''
  },
  builder.translate.getLocaleName());

jQuery('#startup').append(localeIndicator);