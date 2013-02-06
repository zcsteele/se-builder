builder.selenium2.io.locToJSON = function(loc) {
  return {
    type: loc.getName(builder.selenium2),
    value: loc.getValue()
  };
};

builder.selenium2.io.formats.push({
  name: "Selenium Builder",
  extension: ".json",
  format: function(script, name) {
    var cleanScript = {
      'type': 'script',
      'seleniumVersion': "2",
      'formatVersion': 1,
      'steps': []
    };
    for (var i = 0; i < script.steps.length; i++) {
      var cleanStep = { type: script.steps[i].type.name };
      if (script.steps[i].negated) {
        cleanStep.negated = true;
      }
      var pNames = script.steps[i].getParamNames();
      for (var j = 0; j < pNames.length; j++) {
        if (script.steps[i].type.getParamType(pNames[j]) == "locator") {
          cleanStep[pNames[j]] = builder.selenium2.io.locToJSON(script.steps[i][pNames[j]]);
        } else {
          cleanStep[pNames[j]] = script.steps[i][pNames[j]];
        }
      }
      cleanScript.steps.push(cleanStep);
    }
    return JSON.stringify(cleanScript, null, /* indent */ 2);
  },
  canExport: function(stepType) {
    return true;
  },
  nonExportables: function(script) {
    return [];
  }
});

builder.selenium2.io.suiteFormats.push({
  name: "Selenium Builder",
  extension: ".json",
  format: function(scripts, path) {
    var cleanSuite = {
      "type": "suite",
      "seleniumVersion": "2",
      "formatVersion": 1,
      "scripts": []
    };
    for (var i = 0; i < scripts.length; i++) {
      cleanSuite.scripts.push({"where": scripts[i].path.where, "path": scripts[i].path.path});
    }
    return JSON.stringify(cleanSuite, null, /* indent */ 2);
  }
});