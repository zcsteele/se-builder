/**
 * Dialog that can be inserted to allow the user to export the suite using a variety of formats,
 * via builder.selenium1.adapter et al.
 */
builder.dialogs.exportsuite = {};

builder.dialogs.exportsuite.dialog = null;

builder.dialogs.exportsuite.show = function() {
  builder.dialogs.exportsuite.dialog = newNode('div', {'class': 'dialog'});
  
  var format_list = newNode('ul');
  
  var cancel_b = newNode('a', _t('cancel'), {
    'class': 'button',
    'click': function () {
      builder.dialogs.exportsuite.hide();
    },
    'href': '#cancel'
  });
  
  jQuery(builder.dialogs.exportsuite.dialog).
      append(newNode('h3', _t('choose_export_format'))).
      append(format_list).
      append(newNode('p', cancel_b));
  
  // Loop over formats provided by version.
  var formats = builder.getScript().seleniumVersion.io.getSuiteExportFormats(builder.suite.path);
  for (var i = 0; i < formats.length; i++) {
    jQuery(format_list).append(builder.dialogs.exportsuite.createFormatLi(formats[i]));
  }
  
  builder.dialogs.show(builder.dialogs.exportsuite.dialog);
};

builder.dialogs.exportsuite.hide = function () {
  jQuery(builder.dialogs.exportsuite.dialog).remove();
};

builder.dialogs.exportsuite.createFormatLi = function(format) {
  return newNode('li', newNode('a', format.name, {
    'click': function() {
      var path = format.save(builder.suite.scripts, builder.suite.path);
      if (path) {
        builder.suite.path = path;
        builder.suite.format = format;
        builder.suite.setSuiteSaveRequired(false);
        builder.gui.suite.update();
      }
      builder.dialogs.exportsuite.hide();
    }
  }));
};