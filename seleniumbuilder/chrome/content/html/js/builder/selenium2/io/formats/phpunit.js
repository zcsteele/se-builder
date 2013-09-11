builder.selenium2.io.addLangFormatter({
  name: "PHPUnit",
  extension: ".php",
  not: "!",
  start:
    "<?php\n" +
    "\n" +
    "{namespace}\n" +
    "{use}\n" +
    "class {scriptName} extends {parentClass} {\n" +
    "\n" +
    "  /**\n" +
    "   * {@inheritdoc}\n" +
    "   */\n" +
    "  public function setUp() {\n" +
    "    parent::setUp();\n" +
    "  }\n" +
    "\n" +
    "  /**\n" +
    "   * Recorded steps.\n" +
    "   *\n" +
    "   * @throws PHPUnit_Framework_Exception\n" +
    "   */\n" +
    "  public function testSteps() {\n",
  end:
    "  }\n" +
    "\n" +
    "  /**\n" +
    "   * {@inheritdoc}\n" +
    "   */\n" +
    "  public function tearDown() {\n" +
    "    parent::tearDown();\n" +
    "  }\n" +
    "}\n",
  namespace:
    "namespace MyProject\\Tests;\n",
  use:
    "use {parentNamespace}\\{parentClass};\n",
  parentNamespace:
    "Sauce\\Sausage",
  parentClass:
    "WebDriverTestCase",

  /**
   * Operations.
   */
  lineForType: {
    "get":
      "    $this->url({url});\n",
    "goBack":
      "    $this->back();\n",
    "goForward":
      "    $this->forward();\n",
    "refresh":
      "    $this->refresh();\n",
    "clickElement":
      "    $this->{locatorBy}({locator})->click();\n",
    "setElementText":
      "    $element = $this->{locatorBy}({locator})->click();\n" +
      "    $element->clear();\n" +
      "    $element->value(split_keys({text}));\n",
    "sendKeysToElement":
      "    $element = $this->{locatorBy}({locator});\n" +
      "    $element->click();\n" +
      "    $element->value({text});\n",
    "setElementSelected":
      "    $element = $this->{locatorBy}({locator});\n" +
      "    if (!$element->selected()) {\n" +
      "      $element->click();\n" +
      "    }\n",
    "setElementNotSelected":
      "    $element = $this->{locatorBy}({locator});\n" +
      "    if ($element->selected()) {\n" +
      "      $element->click();\n" +
      "    }\n",
    "submitElement":
      "    $this->{locatorBy}({locator})->submit();\n",
    "close":
      "    $this->close();\n",
    "switchToFrame":
      "    $this->frame({identifier});\n",
    "switchToFrameByIndex":
      "    $this->frame({index});\n",
    "switchToWindow":
      "    $this->window({name});\n",
    "switchToDefaultContent":
      "    $this->frame();\n",
    "answerAlert":
      "    $this->altertText({text});\n" +
      "    $this->acceptAlert();\n",
    "acceptAlert":
      "    $this->acceptAlert();\n",
    "dismissAlert":
      "    $this->dismissAlert();\n",
    "print":
      "    print {text};\n",
    "store":
      "    ${variable} = {text};\n"
  },
  locatorByForType: function(stepType, locatorType, locatorIndex) {
    return {
      "class": "byClassName",
      "id": "byId",
      "link text": "byLinkText",
      "xpath": "byXPath",
      "css selector": "byCssSelector",
      "name": "byName",
      "tag name": "byTag"}[locatorType];
  },

  /**
   * Basic tests.
   */
  assert: function(step, escapeValue, doSubs, getter) {
    if (step.negated) {
      return doSubs(
        "    if ({getter} == {cmp}) {\n" +
        "      throw new PHPUnit_Extensions_Selenium2TestCase_Exception('!{stepTypeName} failed');\n" +
        "    }\n", getter);
    } else {
      return doSubs(
        "    if ({getter} != {cmp}) {\n" +
        "      throw new PHPUnit_Extensions_Selenium2TestCase_Exception('{stepTypeName} failed');\n" +
        "    }\n", getter);
    }
  },
  verify: function(step, escapeValue, doSubs, getter) {
    if (step.negated) {
      return doSubs(
        "    if ({getter} == {cmp}) {\n" +
        "      print '!{stepTypeName} failed';\n" +
        "    }\n", getter);
    } else {
      return doSubs(
        "    if ({getter} != {cmp}) {\n" +
        "      print '{stepTypeName} failed';\n" +
        "    }\n", getter);
    }
  },
  waitFor: "",
  store:
    "    ${{variable}} = {getter};\n",
  getters: {
    "BodyText": {
      getter: "$this->byTag('body')->text()",
      cmp: "{text}",
      vartype: ""
    },
    "PageSource": {
      getter: "$this->source()",
      cmp: "{source}",
      vartype: ""
    },
    "Text": {
      getter: "$this->{locatorBy}({locator})->text()",
      cmp: "{text}",
      vartype: ""
    },
    "CurrentUrl": {
      getter: "$this->url()",
      cmp: "{url}",
      vartype: ""
    },
    "Title": {
      getter: "$this->title()",
      cmp: "{title}",
      vartype: ""
    },
    "ElementValue": {
      getter: "$this->{locatorBy}({locator})->value()",
      cmp: "{value}",
      vartype: ""
    },
    "ElementAttribute": {
      getter: "$this->{locatorBy}({locator})->attribute({attributeName})",
      cmp: "{value}",
      vartype: ""
    },
    "CookieByName": {
      getter: "$this->session->cookie->get({name})",
      cmp: "{value}",
      vartype: ""
    },
    "AlertText": {
      getter: "$this->alertText()",
      cmp: "{text}",
      vartype: ""
    },
    "Eval": {
      getter: "$this->execute({script})",
      cmp: "{value}",
      vartype: ""
    }
  },

  /**
   * Boolean tests.
   */
  boolean_assert:
    "    if ({posNot}{getter}) {\n" +
    "      throw new PHPUnit_Extensions_Selenium2TestCase_Exception('{negNot}{stepTypeName} failed');\n" +
    "    }\n",
  boolean_verify:
    "    if ({posNot}{getter}) {\n" +
    "      print '{negNot}{stepTypeName} failed';\n" +
    "    }\n",
  boolean_waitFor: "",
  boolean_store:
    "    ${{variable}} = {getter};\n",
  boolean_getters: {
    "TextPresent": {
      getter: "(strpos($this->byTag('html')->text(), {text}) !== FALSE)",
      vartype: ""
    },
    "ElementPresent": {
      getter: "(strlen($session->element({locatorBy}, {locator})) != 0)",
      vartype: ""
    },
    "ElementSelected": {
      getter: "$this->{locatorBy}({locator})->selected()",
      vartype: ""
    },
    // TODO: I am not sure this works.
    "CookiePresent": {
      getter: "$this->session->cookie->get({name})",
      vartype: ""
    },
    // TODO: I am not sure this works.
    "AlertPresent": {
      getter: "$this->alertText()",
      vartype: ""
    }
  },

  /**
   * @see php.js
   */
  escapeValue: function(stepType, value, pName) {
    if (stepType.name.startsWith("store") && pName == "variable") { return value; }
    if (stepType.name == "switchToFrameByIndex" && pName == "index") { return value; }
    // This function takes a string literal and escapes it and wraps it in quotes.
    function esc(v) { return "\"" + v.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""; }

    // The following is a transducer that produces the escaped expression by going over each
    // character of the input.
    var output = "";       // Escaped expression.
    var lastChunk = "";    // Accumulates letters of the current literal.
    var hasDollar = false; // Whether we've just encountered a $ character.
    var insideVar = false; // Whether we are reading in the name of a variable.
    var varName = "";      // Accumulates letters of the current variable.
    for (var i = 0; i < value.length; i++) {
      var ch = value.substring(i, i + 1);
      if (insideVar) {
        if (ch == "}") {
          // We've finished reading in the name of a variable.
          // If this isn't the start of the expression, use + to concatenate it.
          if (output.length > 0) { output += " . "; }
          output += "$" + varName;
          insideVar = false;
          hasDollar = false;
          varName = "";
        } else {
          // This letter is part of the name of the variable we're reading in.
          varName += ch;
        }
      } else {
        // We're not currently reading in the name of a variable.
        if (hasDollar) {
          // But we *have* just encountered a $, so if this character is a {, we are about to
          // do a variable.
          if (ch == "{") {
            insideVar = true;
            if (lastChunk.length > 0) {
              // Add the literal we've read in to the text.
              if (output.length > 0) { output += " . "; }
              output += esc(lastChunk);
            }
            lastChunk = "";
          } else {
            // No, it was just a lone $.
            hasDollar = false;
            lastChunk += "$" + ch;
          }
        } else {
          // This is the "normal case" - accumulating the letters of a literal. Unless the letter
          // is a $, in which case this may be the start of a...
          if (ch == "$") { hasDollar = true; } else { lastChunk += ch; }
        }
      }
    }
    // Append the final literal, if any, to the output.
    if (lastChunk.length > 0) {
      if (output.length > 0) { output += " . "; }
      output += esc(lastChunk);
    }
    return output;
  },
  usedVar: function(varName) { return "$" + varName; },
  unusedVar: function(varName) { return "$" + varName; }
});
