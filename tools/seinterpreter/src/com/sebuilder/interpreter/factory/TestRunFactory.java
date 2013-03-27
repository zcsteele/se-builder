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

import com.sebuilder.interpreter.Script;
import com.sebuilder.interpreter.TestRun;
import org.openqa.selenium.firefox.FirefoxProfile;

/**
 * Factory to create a TestRun objects from a script.
 * 
 * @author jkowalczyk
 */
public class TestRunFactory  {

    private FirefoxProfile firefoxProfile;
    /**
     * Sets the firefox profile to use when launching firefox driver. If not 
     * set, an empty profile is created.
     */
    public void setFirefoxProfile(FirefoxProfile firefoxProfile) {
        this.firefoxProfile = firefoxProfile;
    }
 
    private int implicitelyWaitDriverTimeout = -1;
    /**
     * 
     * @param implicitelyWaitDriverTimeout 
     */
    public void setImplicitelyWaitDriverTimeout(int implicitelyWaitDriverTimeout) {
        this.implicitelyWaitDriverTimeout = implicitelyWaitDriverTimeout;
    }

    private int pageLoadDriverTimeout = -1;
    /**
     * 
     * @param pageLoadDriverTimeout 
     */
    public void setPageLoadDriverTimeout(int pageLoadDriverTimeout) {
        this.pageLoadDriverTimeout = pageLoadDriverTimeout;
    }
    
    /**
     * 
     * @param script
     * @return a new instance of TestRun
     */
    public TestRun createTestRun(Script script) {
        TestRun testRun = createInstance(script);
        if (firefoxProfile != null) {
            testRun.setFirefoxProfile(firefoxProfile);
        }
        if (implicitelyWaitDriverTimeout > 0) {
            testRun.setImplicitelyWaitDriverTimeout(implicitelyWaitDriverTimeout);
        }
        if (pageLoadDriverTimeout > 0) {
            testRun.setPageLoadDriverTimeout(pageLoadDriverTimeout);
        }
        return testRun;
    }

    public TestRun createInstance(Script script) {
        return new TestRun(script);
    }


}