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
package com.sebuilder.interpreter;

import java.util.HashMap;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * A Selenium 2 step.
 *
 * @author jkowalczyk
 */
public class Step {

    /**
     * Whether the step is negated. Only relevant for Assert/Verify/WaitFor
     * steps.
     */
    private boolean negated;

    boolean isNegated() {
        return negated;
    }
    
    public void setNegated(boolean negated) {
        this.negated = negated;
    }
    
    private StepType type;
    public StepType getType() {
        return type;
    }

    public void setType(StepType type) {
        this.type = type;
    }
    
    private HashMap<String, String> stringParams = new HashMap<String, String>();
    public HashMap<String, String> getStringParams() {
        return stringParams;
    }

    public void setStringParams(HashMap<String, String> stringParams) {
        this.stringParams = stringParams;
    }
    
    private HashMap<String, Locator> locatorParams = new HashMap<String, Locator>();
    public HashMap<String, Locator> getLocatorParams() {
        return locatorParams;
    }

    public void setLocatorParams(HashMap<String, Locator> locatorParams) {
        this.locatorParams = locatorParams;
    }

    public Step(StepType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        try {
            return toJSON().toString();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject o = new JSONObject();
        if (type instanceof Assert) {
            o.put("type", "assert" + ((Assert) type).getGetter().getClass().getSimpleName());
        }
        if (type instanceof Verify) {
            o.put("type", "verify" + ((Verify) type).getGetter().getClass().getSimpleName());
        }
        if (type instanceof WaitFor) {
            o.put("type", "waitFor" + ((WaitFor) type).getGetter().getClass().getSimpleName());
        }
        if (type instanceof Store) {
            o.put("type", "store" + ((Store) type).getGetter().getClass().getSimpleName());
        }
        o.put("negated", negated);
        for (Map.Entry<String, String> pe : stringParams.entrySet()) {
            o.put(pe.getKey(), pe.getValue());
        }
        for (Map.Entry<String, Locator> le : locatorParams.entrySet()) {
            o.put(le.getKey(), le.getValue().toJSON());
        }

        return o;
    }

}
