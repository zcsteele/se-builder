builder.translate = {};

builder.translate.locName = "en-US";
builder.translate.locales = {};

builder.translate.getLocNamePref = function() {
  if (bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.translate.locName")) {
    return bridge.prefManager.getCharPref("extensions.seleniumbuilder.translate.locName");
  } else {
    var localeService = Components.classes["@mozilla.org/intl/nslocaleservice;1"]
                                  .getService(Components.interfaces.nsILocaleService);
    var selectedLocale = localeService.getApplicationLocale();
    return selectedLocale.getCategory("NSILOCALE_COLLATE"); 
  }
};

builder.translate.setLocNamePref = function(locName) {
  bridge.prefManager.setCharPref("extensions.seleniumbuilder.translate.locName", locName);
};

builder.translate.addLocale = function(l) {
  builder.translate.locales[l.name] = l;
};

builder.translate.getLocaleName = function() {
  return builder.translate.locName;
};

builder.translate.setLocaleName = function(locName) {
  builder.translate.locName = locName;
};

builder.translate.getAvailableLocales = function() {
  return builder.translate.locales;
};

function t_(str) {
  return t_l(str, builder.translate.locName);
}

function t_l(str, locName) {
  var s = builder.translate.locales[locName].mapping[str];
  if (!s) {
    if (locName == "en-US") {
      return "{" + str + "}";
    } else {
      return t_l(str, "en-US");
    }
  }
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

var locName = builder.translate.getLocNamePref();
if (builder.translate.locales[locName]) {
  builder.translate.locName = locName;
}