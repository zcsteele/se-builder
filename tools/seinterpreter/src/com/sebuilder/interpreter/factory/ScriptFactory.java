/*
 * Copyright 2012 Sauce Labs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sebuilder.interpreter.factory;

import com.sebuilder.interpreter.Locator;
import com.sebuilder.interpreter.Script;
import com.sebuilder.interpreter.Step;
import java.io.IOException;
import java.io.Reader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

/**
 * Factory to create Script objects from a string, a reader or JSONObject.
 * 
 * @author jkowalczyk
 */
public class ScriptFactory {

    private StepTypeFactory stepTypeFactory = new StepTypeFactory();
    public StepTypeFactory getStepTypeFactory() {
        return stepTypeFactory;
    }

    /**
     * 
     * @param stepTypeFactory instance to use 
     */
    public void setStepTypeFactory(StepTypeFactory stepTypeFactory) {
        this.stepTypeFactory = stepTypeFactory;
    }

    private TestRunFactory testRunFactory = new TestRunFactory();
    /**
     * 
     * @param testRunFactory instance to use
     */
    public void setTestRunFactory(TestRunFactory testRunFactory) {
        this.testRunFactory = testRunFactory;
    }

    /**
     * @return A new instance of script
     */
    public Script create() {
        Script script = new Script();
        script.setTestRunFactory(testRunFactory);
        return script;
    }
    
    /**
     * @param scriptO A JSONObject describing a script.
     * @return A script, ready to run.
     * @throws IOException If anything goes wrong with interpreting the JSON.
     */
    public Script parse(JSONObject scriptO) throws IOException {
        try {
            if (!scriptO.get("seleniumVersion").equals("2")) {
                throw new IOException("Unsupported Selenium version: \"" + scriptO.get("seleniumVersion") + "\".");
            }
            if (scriptO.getInt("formatVersion") != 1) {
                throw new IOException("Unsupported Selenium script format version: \"" + scriptO.get("formatVersion") + "\".");
            }
            Script script = create();
            JSONArray stepsA = scriptO.getJSONArray("steps");
            for (int i = 0; i < stepsA.length(); i++) {
                JSONObject stepO = stepsA.getJSONObject(i);
                Step step = new Step(stepTypeFactory.getStepTypeOfName(stepO.getString("type")));
                step.setNegated(stepO.optBoolean("negated", false));
                script.addStep(step);
                JSONArray keysA = stepO.names();
                for (int j = 0; j < keysA.length(); j++) {
                    String key = keysA.getString(j);
                    if (key.equals("type")) {
                        continue;
                    }
                    if (stepO.optJSONObject(key) != null) {
                        step.getLocatorParams().put(key, new Locator(
                                stepO.getJSONObject(key).getString("type"),
                                stepO.getJSONObject(key).getString("value")));
                    } else {
                        step.getStringParams().put(key, stepO.getString(key));
                    }
                }
            }
            return script;
        } catch (Exception e) {
            throw new IOException("Could not parse script.", e);
        }
    }

    /**
     * @param r A String pointing to a JSON stream describing a script.
     * @return A script, ready to run.
     * @throws IOException If anything goes wrong with interpreting the JSON, or
     * with the Reader.
     * @throws JSONException If the JSON can't be parsed.
     */
    public Script parse(String jsonString) throws IOException, JSONException {
        return parse(new JSONObject(new JSONTokener(jsonString)));
    }

    /**
     * @param r A Reader pointing to a JSON stream describing a script.
     * @return A script, ready to run.
     * @throws IOException If anything goes wrong with interpreting the JSON, or
     * with the Reader.
     * @throws JSONException If the JSON can't be parsed.
     */
    public Script parse(Reader reader) throws IOException, JSONException {
        return parse(new JSONObject(new JSONTokener(reader)));
    }

}