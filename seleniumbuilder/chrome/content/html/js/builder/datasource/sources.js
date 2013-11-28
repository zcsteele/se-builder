builder.datasource = {};

builder.datasource.sources = [];

builder.datasource.register = function(src) {
  builder.datasource.sources.push(src);
};

builder.datasource.getSources = function() {
  return builder.datasource.sources;
}

builder.datasource.updateMenu = function() {
  var srcs = builder.datasource.getSources();
  var script = builder.getScript();
  srcs.forEach(function(src) {
    if (script && script.data.source == src.id) {
      builder.gui.menu.highlightItem('data-' + src.id);
    } else {
      builder.gui.menu.deHighlightItem('data-' + src.id);
    }
  });
};

builder.datasource.showConfig = function(src) {
  function setConfig(config) {
    var script = builder.getScript();
    script.data.configs[src.id] = config;
    script.data.source = src.id;
    builder.datasource.updateMenu();
  }
  if (builder.getScript().data.configs[src.id]) {
    src.showConfigDialog(setConfig, builder.getScript().data.configs[src.id]);
  } else {
    src.showConfigDialog(setConfig);
  }
};