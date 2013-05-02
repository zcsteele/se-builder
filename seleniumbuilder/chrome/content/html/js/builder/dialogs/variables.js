builder.dialogs.variables = {};

builder.dialogs.variables.dialog = null;

builder.dialogs.variables.show = function() {
  builder.dialogs.variables.dialog = newNode('div', {'class': 'dialog'});
  
  var var_table = newNode('table');
  
  var vars = builder.getScript().seleniumVersion.playback.getVars();
    
  var i = 0;
  for (var k in vars) {
    var v = vars[k];
    jQuery(var_table).append(makeKVEntry(i++, k, v));
  }
  
  var add_b = newNode('a', '+', {
    'class': 'button smallbutton',
    'click': function () {
      var name = prompt(_t('step_name'));
      if (name) {
        jQuery(var_table).append(makeKVEntry(i, name, ""));
        jQuery('#kve_f_' + i).focus();
        i++;
      }
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
      append(newNode('p', add_b, close_b));
  
  builder.dialogs.show(builder.dialogs.variables.dialog);
};

builder.dialogs.variables.isAvailable = function() {
  return true;//builder.getScript().seleniumVersion.playback.hasPlaybackSession();
};

function makeKVEntry(i, k, v) {
  return newNode('tr', { 'id': 'kve_' + i },
    newNode('td', k),
    newNode('td', newNode('input', { 'id': 'kve_f_' + i, 'type': 'text', 'value': v, 'keyup': function() {
      builder.getScript().seleniumVersion.playback.setVar(k, jQuery('#kve_f_' + i).val());
    }})),
    newNode('td', newNode('a', { 'class': 'button smallbutton', 'click': function() {
      jQuery('#kve_' + i).remove();
      builder.getScript().seleniumVersion.playback.setVar(k, null);
    }}, "X"))
  );
}

builder.dialogs.variables.hide = function() {
  jQuery(builder.dialogs.variables.dialog).remove();
};