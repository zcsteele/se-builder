/** Attaches functionality to menu items. */
builder.gui.menu = {};

builder.gui.menu.addMenu = function(title, id) {
  jQuery('#menu').append(newNode('li',
    newNode('a', {'href': '#'}, title),
    newNode('ul', {'id': id + '-menu'})
  ));
};

builder.gui.menu.addSingleItemMenu = function(title, id, f) {
  jQuery('#menu').append(newNode('li',
    newNode('a', {'href': '#', 'id': id, 'click': f}, title)
  ));
};

builder.gui.menu.addItem = function(menu, title, id, f) {
  jQuery('#' + menu + '-menu').append(newNode('li', {'id': id + '-li'}, newNode('a', {'click': f, 'id': id}, title)));
};

builder.gui.menu.showItem = function(id) {
  jQuery('#' + id + '-li').show();
};

builder.gui.menu.hideItem = function(id) {
  jQuery('#' + id + '-li').hide();
};

builder.gui.menu.addDivider = function(menu, id) {
  jQuery('#' + menu + '-menu').append(newNode('div', {'id': id, 'class': 'divider'}));
};

builder.gui.menu.addSection = function(menu, id) {
  jQuery('#' + menu + '-menu').append(newNode('span', {'id': menu + '-menu-' + id}));
};

builder.gui.menu.clearSection = function(menu, id) {
  jQuery('#' + menu + '-menu-' + id).html('');
};

builder.gui.menu.addItemToSection = function(menu, section, title, id, f) {
  jQuery('#' + menu + '-menu-' + section).append(newNode('li', {'id': id + '-li'}, newNode('a', {'click': f, 'id': id}, title)));
};

builder.gui.menu.highlightItem = function(id) {
  jQuery('#' + id).addClass('highlightedMenuItem');
};

builder.gui.menu.deHighlightItem = function(id) {
  jQuery('#' + id).removeClass('highlightedMenuItem');
};

/** Updates display of the "run suite on RC" option. */
builder.gui.menu.updateRunSuiteOnRC = function() {
  if (builder.suite.areAllScriptsOfVersion(builder.selenium1)) {
    builder.gui.menu.showItem('run-suite-onrc');
  } else {
    builder.gui.menu.hideItem('run-suite-onrc');
  }
};

builder.registerPostLoadHook(function() {
  // File menu
  builder.gui.menu.addMenu(_t('menu_file'), 'file');
  builder.gui.menu.addItem('file', _t('menu_save'), 'script-save', function() {
    builder.record.stopAll();
    builder.dialogs.exportscript.show(jQuery("#dialog-attachment-point"));
  });
  builder.gui.menu.addItem('file', _t('menu_convert'), 'script-convert', function() {
    builder.record.stopAll();
    builder.dialogs.convert.show(jQuery("#dialog-attachment-point"));
  });
  builder.gui.menu.addItem('file', _t('menu_discard'), 'script-discard', function() {
    if (builder.suite.getNumberOfScripts() > 1) {
      if (!builder.suite.getSaveRequired() ||
          confirm(_t('lose_changes_warning')))
      {
        builder.record.stopAll();
        builder.gui.switchView(builder.views.startup);
        builder.suite.clearSuite();
        // Clear any error messages.
        jQuery('#error-panel').hide();
      }
    } else {
      if (!builder.getScript().saveRequired ||
          confirm(_t('lose_changes_warning')))
      {
        builder.record.stopAll();
        builder.gui.switchView(builder.views.startup);
        builder.suite.clearSuite();        
        // Clear any error messages.
        jQuery('#error-panel').hide();
      }
    }
  });
  
  builder.suite.addScriptChangeListener(function() {
    if (builder.getScript() == null) { return; }
    if (builder.seleniumVersions.length < 3) {
      var otherVersion = builder.seleniumVersions[(builder.seleniumVersions.indexOf(builder.getScript().seleniumVersion) + 1) % 2];
      jQuery('#script-convert').html(_t('menu_convert_to', otherVersion.name));
    }
    jQuery('#selenium-version-display').html(builder.getScript().seleniumVersion.name);
    
    jQuery('#script-discard').html(builder.suite.getNumberOfScripts() > 1 ? _t('menu_discard_suite') : _t('menu_discard'));
  });
  
  // Record button: Record more of the script
  builder.gui.menu.addSingleItemMenu(_t('menu_record'), 'record', function () {
    builder.record.stopAll();
    builder.record.continueRecording();
  });
  
  // Run menu
  builder.gui.menu.addMenu(_t('menu_run'), 'run');
  builder.gui.menu.addItem('run', _t('menu_run_locally'), 'run-locally', function() {
    builder.record.stopAll();
    builder.getScript().seleniumVersion.playback.runTest();
  });
  builder.gui.menu.addItem('run', _t('menu_run_on_rc'), 'run-onrc', function() {
    builder.record.stopAll();
    builder.dialogs.rc.show(jQuery("#dialog-attachment-point"), /*play all*/ false);
  });
  builder.gui.menu.addItem('run', _t('menu_run_suite_locally'), 'run-suite-locally', function() {
    builder.record.stopAll();
    builder.dialogs.runall.runLocally(jQuery("#dialog-attachment-point"));
  });
  builder.gui.menu.addItem('run', _t('menu_run_suite_on_rc'), 'run-suite-onrc', function() {
    builder.record.stopAll();
    builder.dialogs.rc.show(jQuery("#dialog-attachment-point"), /*play all*/ true);
  });
  
  // Suite menu
  builder.gui.menu.addMenu(_t('menu_suite'), 'suite');
  
  builder.gui.menu.updateRunSuiteOnRC();
});