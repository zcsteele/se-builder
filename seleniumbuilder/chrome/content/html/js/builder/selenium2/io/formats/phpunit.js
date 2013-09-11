builder.selenium2.io.addLangFormatter({
  name: "PHPUnit - Selenium 2",
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
    "  public function testSteps() {\n" +
    "    $test = $this; // Workaround for anonymous function scopes in PHP < v5.4.\n" +
    "    $session = $this->prepareSession(); // Make the session available.\n",
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
   * Actions
   */
  lineForType: {
    "get":
      "    // {stepTypeName}\n" +
      "    $this->url({url});\n",
    "goBack":
      "    // {stepTypeName}\n" +
      "    $this->back();\n",
    "goForward":
      "    // {stepTypeName}\n" +
      "    $this->forward();\n",
    "refresh":
      "    // {stepTypeName}\n" +
      "    $this->refresh();\n",
    "clickElement":
      "    // {stepTypeName}\n" +
      "    $this->{locatorBy}({locator})->click();\n",
    "setElementText":
      "    // {stepTypeName}\n" +
      "    $element = $this->{locatorBy}({locator})->click();\n" +
      "    $element->clear();\n" +
      "    $element->value(split_keys({text}));\n",
    "sendKeysToElement":
      "    // {stepTypeName}\n" +
      "    $element = $this->{locatorBy}({locator});\n" +
      "    $element->click();\n" +
      "    $element->value({text});\n",
    "setElementSelected":
      "    // {stepTypeName}\n" +
      "    $element = $this->{locatorBy}({locator});\n" +
      "    if (!$element->selected()) {\n" +
      "      $element->click();\n" +
      "    }\n",
    "setElementNotSelected":
      "    // {stepTypeName}\n" +
      "    $element = $this->{locatorBy}({locator});\n" +
      "    if ($element->selected()) {\n" +
      "      $element->click();\n" +
      "    }\n",
    "submitElement":
      "    // {stepTypeName}\n" +
      "    $this->{locatorBy}({locator})->submit();\n",
    "close":
      "    // {stepTypeName}\n" +
      "    $this->close();\n",
    "switchToFrame":
      "    // {stepTypeName}\n" +
      "    $this->frame({identifier});\n",
    "switchToFrameByIndex":
      "    // {stepTypeName}\n" +
      "    $this->frame({index});\n",
    "switchToWindow":
      "    // {stepTypeName}\n" +
      "    $this->window({name});\n",
    "switchToDefaultContent":
      "    // {stepTypeName}\n" +
      "    $this->frame();\n",
    "answerAlert":
      "    // {stepTypeName}\n" +
      "    $this->altertText({text});\n" +
      "    $this->acceptAlert();\n",
    "acceptAlert":
      "    // {stepTypeName}\n" +
      "    $this->acceptAlert();\n",
    "dismissAlert":
      "    // {stepTypeName}\n" +
      "    $this->dismissAlert();\n",
    "print":
      "    // {stepTypeName}\n" +
      "    print {text};\n",
    "store":
      "    // {stepTypeName}\n" +
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
   * Tests
   */
  assert: function(step, escapeValue, doSubs, getter) {
    var method = step.negated ? "{negMethod}" : "{posMethod}";
    return doSubs(
      "    // {stepTypeName}\n" +
      "    $test->" + method + "({expected}, {getter});\n", getter);
  },
  waitFor: function(step, escapeValue, doSubs, getter) {
    var method = step.negated ? "{negMethod}" : "{posMethod}";
    return doSubs(
      "    // {stepTypeName}\n" +
      "    $this->waitUntil(function() use ($test) {\n" +
      "      try {\n" +
      "        $test->" + method + "({expected}, {getter});\n" +
      "      } catch(Exception $e) {\n" +
      "        return null;\n" +
      "      }\n" +
      "      return true;\n" +
      "    });\n",
      getter);
  },
  store:
    "    ${{variable}} = {getter};\n",

  /**
   * Getters
   */
  getters: {
    CurrentUrl: {
      getter: "$test->url()",
      expected: "{url}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    Title: {
      getter: "$test->title()",
      expected: "{title}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    Text: {
      getter: "$test->{locatorBy}({locator})->text()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    TextPresent: {
      getter: "$test->byTag('html')->text()",
      expected: "{text}",
      posMethod: "assertContains",
      negMethod: "assertNotContains"
    },
    BodyText: {
      getter: "$test->byTag('body')->text()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    PageSource: {
      getter: "$test->source()",
      expected: "{source}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    ElementPresent: {
      getter: "$test->{locatorBy}({locator})",
      expected: "\PHPUnit_Extensions_Selenium2TestCase_Element",
      posMethod: "assertInstanceOf",
      negMethod: "assertNotInstanceOf"
    },
    ElementAttribute: {
      getter: "$test->{locatorBy}({locator})->attribute({attributeName})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    ElementValue: {
      getter: "$test->{locatorBy}({locator})->value()",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    CookiePresent: {
      getter: "$session->cookie()->get({name})",
      expected: "\"string\"",
      posMethod: "assertInternalType",
      negMethod: "assertNotInternalType"
    },
    CookieByName: {
      getter: "$session->cookie()->get({name})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    AlertText: {
      getter: "$test->alertText()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    AlertPresent: {
      getter: "$test->alertText()",
      expected: "\"string\"",
      posMethod: "assertInternalType",
      negMethod: "assertNotInternalType"
    },
    Eval: {
      getter: "$test->execute({script})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
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
