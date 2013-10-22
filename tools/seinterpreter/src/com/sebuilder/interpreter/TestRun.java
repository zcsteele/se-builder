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

import com.sebuilder.interpreter.webdriverfactory.WebDriverFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
<<<<<<< HEAD
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
=======
import org.openqa.selenium.remote.RemoteWebDriver;
>>>>>>> upstream/master

/**
 * A single run of a test script.
 *
 * @author zarkonnen
 */
public class TestRun {
<<<<<<< HEAD

    private HashMap<String, String> vars = new HashMap<String, String>();

    public HashMap<String, String> getVars() {
        return vars;
    }

    public void addVar(String key, String value) {
        vars.put(key, value);
    }
    private Script script;

    public Script getScript() {
        return script;
    }
    protected int stepIndex = -1;
    private FirefoxDriver driver;

    public FirefoxDriver getDriver() {
        return driver;
    }
    private Log log;

    /**
     * @return The logger being used.
     */
    public Log getLog() {
        return log;
    }
    /**
     * The profile to load to firefox driver. If null, a new empty profile is
     * created
     */
    private FirefoxProfile firefoxProfile;

    public FirefoxProfile getFirefoxProfile() {
        return firefoxProfile;
    }

    public void setFirefoxProfile(FirefoxProfile firefoxProfile) {
        this.firefoxProfile = firefoxProfile;
    }
    private Long implicitelyWaitDriverTimeout;

    public Long getImplicitelyWaitDriverTimeout() {
        return implicitelyWaitDriverTimeout;
    }

    public void setImplicitelyWaitDriverTimeout(int implicitelyWaitDriverTimeout) {
        this.implicitelyWaitDriverTimeout = Long.valueOf(implicitelyWaitDriverTimeout);
    }
    private Long pageLoadDriverTimeout;

    public Long getPageLoadDriverTimeout() {
        return pageLoadDriverTimeout;
    }

    public void setPageLoadDriverTimeout(int pageLoadDriverTimeout) {
        this.pageLoadDriverTimeout = Long.valueOf(pageLoadDriverTimeout);
    }

    public TestRun(Script script) {
        this.script = script;
        log = LogFactory.getFactory().getInstance(SeInterpreter.class);
    }

    public TestRun(Script script, Log log) {
        this.script = script;
        this.log = log;
    }

    /**
     * @return True if there is another step to execute.
     */
    public boolean hasNext() {
        boolean hasNext = stepIndex < script.getSteps().size() - 1;
        if (!hasNext && driver != null) {
            log.debug("Closing FirefoxDriver.");
            driver.close();
        }
        return hasNext;
    }

    /**
     * Executes the next step.
     *
     * @return True on success.
     */
    public boolean next() {
        if (stepIndex == -1) {
            log.debug("Starting test run.");
        }
        
        initDriver();
        
        log.debug("Running step " + (stepIndex + 2) + ":"
                + script.getSteps().get(stepIndex + 1).getClass().getSimpleName() + " step.");
        boolean result = false;
        try {
            result = script.getSteps().get(++stepIndex).getType().run(this);
        } catch (Exception e) {
            throw new RuntimeException(currentStep() + " failed.", e);
        }

        if (!result) {
            // If a verify failed, we just note this but continue.
            if (currentStep().getType() instanceof Verify) {
                log.error(currentStep() + " failed.");
                return false;
            }
            // In all other cases, we throw an exception to stop the run.
            RuntimeException e = new RuntimeException(currentStep() + " failed.");
            e.fillInStackTrace();
            log.fatal(e);
            throw e;
        } else {
            return true;
        }
    }

    /**
     * Resets the script's progress and closes the driver if needed.
     */
    public void reset() {
        log.debug("Resetting test run.");
        vars.clear();
        stepIndex = -1;
        if (driver != null) {
            driver.close();
        }
    }

    /**
     * Runs the entire (rest of the) script.
     *
     * @return True if the script ran successfully, false if a verification
     * failed. Any other failure throws an exception.
     * @throws RuntimeException if the script failed.
     */
    public boolean finish() {
        boolean success = true;
        try {
            while (hasNext()) {
                success = next() && success;
            }
        } catch (RuntimeException e) {
            // If the script terminates, the driver will be closed automatically.
            try {
                driver.close();
            } catch (Exception e2) {}
            throw e;
        }
        return success;
    }

    /**
     * @return The step that is being/has just been executed.
     */
    public Step currentStep() {
        return script.getSteps().get(stepIndex);
    }

    /**
     * @return The driver instance being used.
     */
    public FirefoxDriver driver() {
        return driver;
    }

    /**
     * @return The logger being used.
     */
    public Log log() {
        return log;
    }

    /**
     * @return The HashMap of vars.
     */
    public HashMap<String, String> vars() {
        return vars;
    }

    /**
     * Fetches a String parameter from the current step.
     *
     * @param paramName The parameter's name.
     * @return The parameter's value.
     */
    public String string(String paramName) {
        String s = currentStep().getStringParams().get(paramName);
        if (s == null) {
            throw new RuntimeException("Missing parameter \"" + paramName + "\" at step #"
                    + (stepIndex + 1) + ".");
        }
        // This kind of variable substitution makes for short code, but it's inefficient.
        for (Map.Entry<String, String> v : vars.entrySet()) {
            s = s.replace("${" + v.getKey() + "}", v.getValue());
        }
        return s;
    }

    /**
     * Fetches a Locator parameter from the current step.
     *
     * @param paramName The parameter's name.
     * @return The parameter's value.
     */
    public Locator locator(String paramName) {
        Locator l = new Locator(currentStep().getLocatorParams().get(paramName));
        if (l == null) {
            throw new RuntimeException("Missing parameter \"" + paramName + "\" at step #"
                    + (stepIndex + 1) + ".");
        }
        // This kind of variable substitution makes for short code, but it's inefficient.
        for (Map.Entry<String, String> v : vars.entrySet()) {
            l.value = l.value.replace("${" + v.getKey() + "}", v.getValue());
        }
        return l;
    }
    
    /**
     * Initialise firefoxDriver with a profile, and if set, an implicitelyWaitDriverTimeout
     * and a pageLoadDriverTimeout
     */
    public void initDriver() {
        if (driver == null) {
            log.debug("Initialising FirefoxDriver.");
            if (firefoxProfile == null) {
                firefoxProfile = new FirefoxProfile();
            }
            driver = new FirefoxDriver(firefoxProfile);
            if (implicitelyWaitDriverTimeout != null) {
                driver.manage().timeouts().implicitlyWait(implicitelyWaitDriverTimeout, TimeUnit.SECONDS);
            }
            if (pageLoadDriverTimeout != null) {
                driver.manage().timeouts().pageLoadTimeout(pageLoadDriverTimeout, TimeUnit.SECONDS);
            }
            log.debug("Initialisation FirefoxDriver terminated ");
        }
    }
=======
	HashMap<String, String> vars = new HashMap<String, String>();
	Script script;
	int stepIndex = -1;
	RemoteWebDriver driver;
	Log log;
	WebDriverFactory webDriverFactory = SeInterpreter.DEFAULT_DRIVER_FACTORY;
	HashMap<String, String> webDriverConfig = new HashMap<String, String>();

	public TestRun(Script script) {
		this.script = script;
		log = LogFactory.getFactory().getInstance(SeInterpreter.class);
	}
	
	public TestRun(Script script, Log log) {
		this.script = script;
		this.log = log;
	}
	
	public TestRun(Script script, Log log, WebDriverFactory webDriverFactory, HashMap<String, String> webDriverConfig) {
		this.script = script;
		this.log = log;
		this.webDriverFactory = webDriverFactory;
		this.webDriverConfig = webDriverConfig;
	}
	
	/** @return True if there is another step to execute. */
	public boolean hasNext() {
		boolean hasNext = stepIndex < script.steps.size() - 1;
		if (!hasNext && driver != null) {
			log.debug("Quitting driver.");
			driver.quit();
		}
		return hasNext;
	}
	
	/**
	 * Executes the next step.
	 * @return True on success.
	 */
	public boolean next() {
		if (stepIndex == -1) {
			log.debug("Starting test run.");
		}
		if (driver == null) {
			log.debug("Initialising driver.");
			try {
				driver = webDriverFactory.make(webDriverConfig);
			} catch (Exception e) {
				throw new RuntimeException("Test run failed: unable to create driver.", e);
			}
		}
		log.debug("Running step " + (stepIndex + 2) + ":" +
				script.steps.get(stepIndex + 1).getClass().getSimpleName() + " step.");
		boolean result = false;
		try {
			result = script.steps.get(++stepIndex).type.run(this);
		} catch (Exception e) {
			throw new RuntimeException(currentStep() + " failed.", e);
		}
		
		if (!result) {
			// If a verify failed, we just note this but continue.
			if (currentStep().type instanceof Verify) {
				log.error(currentStep() + " failed.");
				return false;
			}
			// In all other cases, we throw an exception to stop the run.
			RuntimeException e = new RuntimeException(currentStep() + " failed.");
			e.fillInStackTrace();
			log.fatal(e);
			throw e;
		} else {
			return true;
		}
	}
	
	/**
	 * Resets the script's progress and closes the driver if needed.
	 */
	public void reset() {
		log.debug("Resetting test run.");
		vars.clear();
		stepIndex = -1;
		if (driver != null) { driver.quit(); }
	}
	
	/**
	 * Runs the entire (rest of the) script.
	 * @return True if the script ran successfully, false if a verification failed.
	 *         Any other failure throws an exception.
	 * @throws RuntimeException if the script failed.
	 */
	public boolean finish() {
		boolean success = true;
		try {
			while (hasNext()) {
				success = next() && success;
			}
		} catch (RuntimeException e) {
			// If the script terminates, the driver will be closed automatically.
			try { driver.quit(); } catch (Exception e2) {}
			throw e;
		}
		return success;
	}
	
	/** @return The step that is being/has just been executed. */
	public Script.Step currentStep() { return script.steps.get(stepIndex); }
	/** @return The driver instance being used. */
	public RemoteWebDriver driver() { return driver; }
	/** @return The logger being used. */
	public Log log() { return log; }
	/** @return The HashMap of vars. */
	public HashMap<String, String> vars() { return vars; }
		
	/**
	 * Fetches a String parameter from the current step.
	 * @param paramName The parameter's name.
	 * @return The parameter's value.
	 */
	public String string(String paramName) {
		String s = currentStep().stringParams.get(paramName);
		if (s == null) {
			throw new RuntimeException("Missing parameter \"" + paramName + "\" at step #" +
					(stepIndex + 1) + ".");
		}
		// This kind of variable substitution makes for short code, but it's inefficient.
		for (Map.Entry<String, String> v : vars.entrySet()) {
			s = s.replace("${" + v.getKey() + "}", v.getValue());
		}
		return s;
	}
	
	/**
	 * Fetches a Locator parameter from the current step.
	 * @param paramName The parameter's name.
	 * @return The parameter's value.
	 */
	public Locator locator(String paramName) {
		Locator l = new Locator(currentStep().locatorParams.get(paramName));
		if (l == null) {
			throw new RuntimeException("Missing parameter \"" + paramName + "\" at step #" +
					(stepIndex + 1) + ".");
		}
		// This kind of variable substitution makes for short code, but it's inefficient.
		for (Map.Entry<String, String> v : vars.entrySet()) {
			l.value = l.value.replace("${" + v.getKey() + "}", v.getValue());
		}
		return l;
	}
>>>>>>> upstream/master
}
