builder.dialogs.inputs = {};

builder.dialogs.inputs.dialog = null;
builder.dialogs.inputs.types = ['string', 'int'];
builder.dialogs.inputs.inputs = [];

builder.dialogs.inputs.show = function() {
  builder.dialogs.inputs.dialog = newNode('div', {'class': 'dialog'});
  
  var var_table = newNode('table');
  
  builder.dialogs.inputs.refreshTable(var_table);
        
  var add_b = newNode('a', '+', {
    'class': 'button smallbutton',
    'click': function () {
      var name = prompt(_t('step_name'));
      if (name) {
        jQuery(var_table).append(builder.dialogs.variables.makeKVEntry(builder.dialogs.variables.entryIndex, name, ""));
        jQuery('#kve_f_' + builder.dialogs.variables.entryIndex).focus();
        builder.dialogs.variables.entryIndex++;
      }
    }
  });
  
  var refresh_b = newNode('a', _t('plugins_refresh'), {
    'class': 'button',
    'click': function () {
      builder.dialogs.variables.refreshTable(var_table);
    }
  });
  
  var close_b = newNode('a', _t('close'), {
    'class': 'button',
    'click': function () {
      builder.dialogs.variables.hide();
    }
  });
  
  jQuery(builder.dialogs.variables.dialog).
      append(newNode('h3', _t('variables'))).
      append(var_table).
      append(newNode('p', add_b, refresh_b, close_b));
  
  builder.dialogs.show(builder.dialogs.variables.dialog);
};

builder.dialogs.inputs.hide = function() {
  jQuery(builder.dialogs.inputs.dialog).remove();
};



if (builder && builder.loader && builder.loader.loadNextMainScript) { builder.loader.loadNextMainScript(); }