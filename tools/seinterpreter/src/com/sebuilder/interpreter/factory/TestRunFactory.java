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
import com.sebuilder.interpreter.webdriverfactory.WebDriverFactory;
import java.util.HashMap;
import org.apache.commons.logging.Log;

/**
 * Factory to create a TestRun objects from a script.
 * 
 * @author jkowalczyk
 */
public class TestRunFactory  {

    private int implicitelyWaitDriverTimeout = -1;
    /**
     * 
     * @param implicitelyWaitDriverTimeout 
     */
    public void setImplicitelyWaitDriverTimeout(int implicitelyWaitDriverTimeout) {
        this.implicitelyWaitDriverTimeout = implicitelyWaitDriverTimeout;
    }
    /**
     * 
     * @return implicitelyWaitDriverTimeout
     */
    public int getImplicitelyWaitDriverTimeout() {
        return this.implicitelyWaitDriverTimeout;
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
     * @return pageLoadDriverTimeout 
     */
    public int getPageLoadDriverTimeout() {
        return this.pageLoadDriverTimeout;
    }
    
    /**
     * 
     * @param script
     * @return a new instance of TestRun
     */
    public TestRun createTestRun(Script script) {
        return new TestRun(script, implicitelyWaitDriverTimeout, pageLoadDriverTimeout);
    }
    
    /**
     * 
     * @param script
     * @param log
     * @param webDriverFactory
     * @param webDriverConfig
     * @return a new instance of TestRun
     */
    public TestRun createTestRun(Script script, Log log, WebDriverFactory webDriverFactory, HashMap<String, String> webDriverConfig) {
        return new TestRun(script, log, webDriverFactory, webDriverConfig, implicitelyWaitDriverTimeout, pageLoadDriverTimeout);
    }
    
    /**
     * 
     * @param script
     * @param log
     * @param webDriverFactory
     * @param webDriverConfig
     * @return a new instance of TestRun
     */
    public TestRun createTestRun(Script script, WebDriverFactory webDriverFactory, HashMap<String, String> webDriverConfig) {
        return new TestRun(script, webDriverFactory, webDriverConfig, implicitelyWaitDriverTimeout, pageLoadDriverTimeout);
    }

}