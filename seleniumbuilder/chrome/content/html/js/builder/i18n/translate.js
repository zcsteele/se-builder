builder.translate = {};

builder.translate.locName = "en-US";
builder.translate.locales = {};

builder.translate.getLocale = function() {
  return builder.translate.locales[builder.translate.locale];
};

builder.translate.addLocale = function(l) {
  builder.translate.locales[l.name] = l;
};

builder.translate.setLocale = function(locName) {
  builder.translate.locName = locName;
};

builder.translate.getAvailableLocales = function() {
  return builder.translate.locales;
};

function t_(str) {
  var s = locales[locName].mapping[str];
  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];
    if (typeof arg == 'object') {
      for (var k in arg) {
        var v = arg[k];
        s = s.replace(new RegExp("\{" + k + "\}", "g"), v);
      }
    } else {
      s = s.replace(new RegExp("\{" + i + "\}", "g"), arg);
    }
  }
  return s;
}