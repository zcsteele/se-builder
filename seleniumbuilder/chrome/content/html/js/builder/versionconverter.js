/** Converts between selenium 1 and 2. */
builder.versionconverter = {};

/**
 * Special conversion functions. Most step types can be converted "automatically", but some need
 * special treatments, eg adding a waitForPageToLoad after an open when converting Selenium 2 to
 * Selenium 1.
 */
builder.versionconverter.conversionHooks = {};

builder.versionconverter.addHook = function(srcType, srcVersion, targetVersion, conversionFunction) {
  var key = srcType.getName() + "-" + srcVersion + "-" + targetVersion;
  builder.versionconverter.conversionHooks[key] = conversionFunction;
};

builder.versionconverter.addHook(builder.selenium1.stepTypes.waitForPageToLoad, builder.selenium1, builder.selenium2, function(step, src, tar) {
  return [];
});

builder.versionconverter.addHook(
  builder.selenium2.stepTypes.get,
  builder.selenium2,
  builder.selenium1,
  function(step, src, tar) {
    var newSteps = builder.versionconverter.defaultConvertStep(step, src, tar);
    newSteps.push(new builder.Step(builder.selenium1.stepTypes.waitForPageToLoad, "60000"));
    return newSteps;
  }
);

builder.versionconverter.stripReturn = function(step, src, tar) {
  var newSteps = builder.versionconverter.defaultConvertStep(step, src, tar);
  if (newSteps[0].script.substr(0, "return ".length) == "return ") {
    newSteps[0].script = newSteps[0].script.substr("return ".length);
  }
  return newSteps;
};

builder.versionconverter.addReturn = function(step, src, tar) {
  var newSteps = builder.versionconverter.defaultConvertStep(step, src, tar);
  newSteps[0].script = "return " + newSteps[0].script;
  return newSteps;
};

builder.versionconverter.addHook(
  builder.selenium2.stepTypes.assertEval,
  builder.selenium2,
  builder.selenium1,
  builder.versionconverter.stripReturn
);

builder.versionconverter.addHook(
  builder.selenium2.stepTypes.verifyEval,
  builder.selenium2,
  builder.selenium1,
  builder.versionconverter.stripReturn
);

builder.versionconverter.addHook(
  builder.selenium2.stepTypes.waitForEval,
  builder.selenium2,
  builder.selenium1,
  builder.versionconverter.stripReturn
);

builder.versionconverter.addHook(
  builder.selenium2.stepTypes.storeEval,
  builder.selenium2,
  builder.selenium1,
  builder.versionconverter.stripReturn
);

builder.versionconverter.addHook(
  builder.selenium1.stepTypes.assertEval,
  builder.selenium1,
  builder.selenium2,
  builder.versionconverter.addReturn
);

builder.versionconverter.addHook(
  builder.selenium1.stepTypes.verifyEval,
  builder.selenium1,
  builder.selenium2,
  builder.versionconverter.addReturn
);

builder.versionconverter.addHook(
  builder.selenium1.stepTypes.waitForEval,
  builder.selenium1,
  builder.selenium2,
  builder.versionconverter.addReturn
);

builder.versionconverter.addHook(
  builder.selenium1.stepTypes.storeEval,
  builder.selenium1,
  builder.selenium2,
  builder.versionconverter.addReturn
);

// Need to combine the selectLocator and optionLocator into a single locator for Selenium 2.
builder.versionconverter.convertSelectStep1To2 = function(step, sourceVersion, targetVersion) {
  var newStep = builder.versionconverter.defaultConvertStep(step, sourceVersion, targetVersion)[0];
  var locVals = {};
  var method = builder.locator.methods.xpath;
  if (step.optionLocator.indexOf("label=") == 0) {
    if (step.selectLocator.supportsMethod(builder.locator.methods.xpath)) {
      locVals[builder.locator.methods.xpath] = [step.selectLocator.getValue(builder.locator.methods.xpath) +
        "/*[. = '" + step.optionLocator.substring("label=".length) + "']"];
    } else if (step.selectLocator.supportsMethod(builder.locator.methods.id)) {
      locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.selectLocator.getValue(builder.locator.methods.id) +
        "']/*[. = '" + step.optionLocator.substring("label=".length) + "']"];
    }
  } else if (step.optionLocator.indexOf("id=") == 0) {
    method = builder.locator.methods.id;
    locVals[builder.locator.methods.id] = [step.optionLocator.substring("id=".length)];
    locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.optionLocator.substring("id=".length) + "']"];
  } else if (step.optionLocator.indexOf("index=") == 0) {
    var index = parseInt(step.optionLocator.substring("index=".length)) + 1; // XPATH uses 1-based indexing!
    if (step.selectLocator.supportsMethod(builder.locator.methods.xpath)) {
      locVals[builder.locator.methods.xpath] = [step.selectLocator.getValue(builder.locator.methods.xpath) +
        "/*[" + index + "]"];
    } else if (step.selectLocator.supportsMethod(builder.locator.methods.id)) {
      locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.selectLocator.getValue(builder.locator.methods.id) +
        "']/*[" + index + "]"];
    }
  } else if (step.optionLocator.indexOf("value=") == 0) {
    if (step.selectLocator.supportsMethod(builder.locator.methods.xpath)) {
      locVals[builder.locator.methods.xpath] = [step.selectLocator.getValue(builder.locator.methods.xpath) +
        "/*[@value = '" + step.optionLocator.substring("value=".length) + "']"];
    } else if (step.selectLocator.supportsMethod(builder.locator.methods.id)) {
      locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.selectLocator.getValue(builder.locator.methods.id) +
        "']/*[@value = '" + step.optionLocator.substring("value=".length) + "']"];
    }
  } else {
    if (step.selectLocator.supportsMethod(builder.locator.methods.xpath)) {
      locVals[builder.locator.methods.xpath] = [step.selectLocator.getValue(builder.locator.methods.xpath) +
        "/*[. = '" + step.optionLocator + "']"];
    } else if (step.selectLocator.supportsMethod(builder.locator.methods.id)) {
      locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.selectLocator.getValue(builder.locator.methods.id) +
        "']/*[. = '" + step.optionLocator + "']"];
    }
  }
  var newLoc = new builder.locator.Locator(method, 0, locVals);
  newStep.locator = newLoc;
  return [newStep];
};

builder.versionconverter.addHook(builder.selenium1.stepTypes.select, builder.selenium1, builder.selenium2, builder.versionconverter.convertSelectStep1To2);
builder.versionconverter.addHook(builder.selenium1.stepTypes.removeSelection, builder.selenium1, builder.selenium2, builder.versionconverter.convertSelectStep1To2);
builder.versionconverter.addHook(builder.selenium1.stepTypes.addSelection, builder.selenium1, builder.selenium2, builder.versionconverter.convertSelectStep1To2);

builder.versionconverter.convertStep = function(step, sourceVersion, targetVersion) {
  var key = step.type.getName() + "-" + sourceVersion + "-" + targetVersion;
  if (builder.versionconverter.conversionHooks[key]) {
    return builder.versionconverter.conversionHooks[key](step, sourceVersion, targetVersion);
  }
  return builder.versionconverter.defaultConvertStep(step, sourceVersion, targetVersion);
}

builder.versionconverter.defaultConvertStep = function(step, sourceVersion, targetVersion) {
  var newStep = null;
  if (sourceVersion == builder.selenium1 && targetVersion == builder.selenium2) {
    newStep = new builder.Step(builder.selenium2.stepTypes[builder.versionconverter.sel1ToSel2Steps[step.type.getName()]]);
  }
  if (sourceVersion == builder.selenium2 && targetVersion == builder.selenium1) {
    newStep = new builder.Step(builder.selenium1.stepTypes[builder.versionconverter.sel2ToSel1Steps[step.type.getName()]]);
  }
  if (newStep != null) {
    newStep.negated = step.negated;
    newStep.step_name = step.step_name;
    var srcParamNames = step.getParamNames();
    var targetParamNames = newStep.getParamNames();
    for (var i = 0; i < srcParamNames.length && i < targetParamNames.length; i++) {
      newStep[targetParamNames[i]] = builder.versionconverter.convertParam(step[srcParamNames[i]], step.type.getParamType(srcParamNames[i]), sourceVersion, targetVersion);
    }
    return [newStep];
  }
  return null;
};

builder.versionconverter.convertParam = function(param, paramType, sourceVersion, targetVersion) {
  if (paramType == "locator") {
    if (param.getName(targetVersion) == null) {
      // Uh-oh, this is something that the target version does not support.
      var loc2 = builder.locator.empty();
      for (var k in builder.locator.methods) {
        var lMethod = builder.locator.methods[k];
        if (!lMethod[targetVersion]) { continue; }
        if (param.supportsMethod(lMethod)) {
          loc2.preferredMethod = lMethod;
          loc2.values[lMethod] = {};
          for (var i = 0; i < param.values[lMethod].length; i++) {
            loc2.values[lMethod].push(param.values[lMethod][i]);
          }
        }
      }
      if (loc2.getValue() == "") {
        // Uh-oh x2: And there are no alternatives. So we'll have to convert something.
        if (sourceVersion == builder.selenium1) {
          if (param.supportsMethod(builder.locator.methods.identifier)) {
            loc2.values[builder.locator.methods.id] = [param.getValueForMethod(builder.locator.methods.identifier)];
            loc2.preferredMethod = builder.locator.methods.id;
            return loc2;
          }
        }
        
        // Give up!
        return loc2;
      }
    }
  }
  
  return param;
};


builder.versionconverter.convertScript = function(script, targetVersion) {
  var newScript = new builder.Script(targetVersion);
  for (var i = 0; i < script.steps.length; i++) {
    var newSteps = builder.versionconverter.convertStep(script.steps[i], script.seleniumVersion, targetVersion);
    for (var j = 0; j < newSteps.length; j++) {
      newScript.addStep(newSteps[j]);
    }
  }
  newScript.data.source = script.data.source;
  for (var cid in script.data.configs) {
    var cfg = {};
    for (var k in script.data.configs[cid]) {
      cfg[k] = script.data.configs[cid][k];
    }
    newScript.data.configs[cid] = cfg;
  }
  
  for (var i = 0; i < script.inputs.length; i++) {
    newScript.inputs.push([script.inputs[i][0], script.inputs[i][1]]);
  }
  
  return newScript;
};

builder.versionconverter.nonConvertibleStepNames = function(script, targetVersion) {
  var names = [];
  for (var i = 0; i < script.steps.length; i++) {
    try {
      if (builder.versionconverter.convertStep(script.steps[i], script.seleniumVersion, targetVersion) == null) {
        names.push(script.steps[i].type.getName());
      }
    } catch (e) {
      names.push(script.steps[i].type.getName());
    }
  }
  return names;
};

builder.versionconverter.canConvert = function(script, targetVersion) {
  return builder.versionconverter.nonConvertibleStepNames(script, targetVersion).length == 0;
};

builder.versionconverter.sel1ToSel2Steps = {
  "open":                 "get",
  "goBack":               "goBack",
  "goForward":            "goForward",
  "click":                "clickElement",
  "type":                 "setElementText",
  "select":               "setElementSelected",
  "check":                "setElementSelected",
  "clickAt":              "clickElementWithOffset",
  "doubleClick":          "doubleClickElement",
  "mouseOver":            "mouseOverElement",
  "dragAndDropToObject":  "dragToAndDropElement",
  "mouseDown":            "clickAndHoldElement",
  "mouseUp":              "releaseElement",
  "addSelection":         "setElementSelected",
  "removeAllSelections":  "clearSelections",
  "removeSelection":      "setElementNotSelected",
  "uncheck":              "setElementNotSelected",
  "submit":               "submitElement",
  "close":                "close",
  "refresh":              "refresh",
  "assertTextPresent":    "assertTextPresent",
  "verifyTextPresent":    "verifyTextPresent",
  "waitForTextPresent":   "waitForTextPresent",
  "storeTextPresent":     "storeTextPresent",
  "assertBodyText":       "assertBodyText",
  "verifyBodyText":       "verifyBodyText",
  "waitForBodyText":      "waitForBodyText",
  "storeBodyText":        "storeBodyText",
  "assertElementPresent": "assertElementPresent",
  "verifyElementPresent": "verifyElementPresent",
  "waitForElementPresent":"waitForElementPresent",
  "storeElementPresent":  "storeElementPresent",
  "assertHtmlSource":     "assertPageSource",
  "verifyHtmlSource":     "verifyPageSource",
  "waitForHtmlSource":    "waitForPageSource",
  "storeHtmlSource":      "storePageSource",
  "assertText":           "assertText",
  "verifyText":           "verifyText",
  "waitForText":          "waitForText",
  "storeText":            "storeText",
  "assertLocation":       "assertCurrentUrl",
  "verifyLocation":       "verifyCurrentUrl",
  "waitForLocation":      "waitForCurrentUrl",
  "storeLocation":        "storeCurrentUrl",
  "assertTitle":          "assertTitle",
  "verifyTitle":          "verifyTitle",
  "waitForTitle":         "waitForTitle",
  "storeTitle":           "storeTitle",
  "assertChecked":        "assertElementSelected",
  "verifyChecked":        "verifyElementSelected",
  "waitForChecked":       "waitForElementSelected",
  "storeChecked":         "storeElementSelected",
  "assertValue":          "assertElementValue",
  "verifyValue":          "verifyElementValue",
  "waitForValue":         "waitForElementValue",
  "storeValue":           "storeElementValue",
  "deleteCookie":         "deleteCookie",
  "assertCookieByName":   "assertCookieByName",
  "verifyCookieByName":   "verifyCookieByName",
  "waitForCookieByName":  "waitForCookieByName",
  "storeCookieByName":    "storeCookieByName",
  "assertCookiePresent":  "assertCookiePresent",
  "verifyCookiePresent":  "verifyCookiePresent",
  "waitForCookiePresent": "waitForCookiePresent",
  "storeCookiePresent":   "storeCookiePresent",
  "captureEntirePageScreenshot": "saveScreenshot",
  "echo":                 "print",
  "pause":                "pause",
  "selectFrame":          "switchToFrame",
  "selectWindow":         "switchToWindow",
  "assertAlert":          "assertAlertText",
  "assertPrompt":         "assertAlertText",
  "verifyAlert":          "verifyAlertText",
  "verifyPrompt":         "verifyAlertText",
  "waitForAlert":         "waitForAlertText",
  "waitForPrompt":        "waitForAlertText",
  "storeAlert":           "storeAlertText",
  "storePrompt":          "storeAlertText",
  "assertAlertPresent":   "assertAlertPresent",
  "assertPromptPresent":  "assertAlertPresent",
  "verifyAlertPresent":   "verifyAlertPresent",
  "verifyPromptPresent":  "verifyAlertPresent",
  "waitForAlertPresent":  "waitForAlertPresent",
  "waitForPromptPresent": "waitForAlertPresent",
  "storeAlertPresent":    "storeAlertPresent",
  "storePromptPresent":   "storeAlertPresent",
  "answerOnNextPrompt":   "answerAlert",
  "chooseCancelOnNextConfirmation": "dismissAlert",
  "assertEval":           "assertEval",
  "verifyEval":           "verifyEval",
  "waitForEval":          "waitForEval",
  "storeEval":            "storeEval"
};

builder.versionconverter.sel2ToSel1Steps = {};

for (var a in builder.versionconverter.sel1ToSel2Steps) {
  builder.versionconverter.sel2ToSel1Steps[builder.versionconverter.sel1ToSel2Steps[a]] = a;
}



if (builder && builder.loader && builder.loader.loadNextMainScript) { builder.loader.loadNextMainScript(); }
