/** Playback system for Selenium RC. */
builder.selenium1.rcPlayback = {};

/** List of run objects. */
builder.selenium1.rcPlayback.runs = [];

builder.selenium1.rcPlayback.getHostPort = function() {
  return bridge.prefManager.getCharPref("extensions.seleniumbuilder.rc.hostport");
};

builder.selenium1.rcPlayback.setHostPort = function(hostPort) {
  bridge.prefManager.setCharPref("extensions.seleniumbuilder.rc.hostport", hostPort);
};

builder.selenium1.rcPlayback.getBrowserString = function() {
  return bridge.prefManager.getCharPref("extensions.seleniumbuilder.rc.browserstring");
};

builder.selenium1.rcPlayback.setBrowserString = function(browserstring) {
  bridge.prefManager.setCharPref("extensions.seleniumbuilder.rc.browserstring", browserstring);
};

builder.selenium1.rcPlayback.makeRun = function(settings, script, postRunCallback, jobStartedCallback) {
  return {
    /** The user has requested that playback be stopped. */
    requestStop: false,
    /** The result of the current step being played back. */
    result: { success: false },
    /** The script being played back. */
    script: script,
    /** The index of the step being played back, or -1 if we're at the start. */
    currentStepIndex: -1,
    /** Function to call after playback is complete. */
    postRunCallback: postRunCallback || null,
    /** Function to call on session start. */
    jobStartedCallback: jobStartedCallback || null,
    /** The identifier for this RC session. */
    session: false,
    /** The host and port to communicate with. */
    hostPort: settings.hostPort,
    /** The pause incrementor. */
    pauseCounter: 0,
    /** The pause interval. */
    pauseInterval: null
  };
}

builder.selenium2.rcPlayback.isRunning = function() {
  return builder.selenium1.rcPlayback.runs.length > 0;
};

builder.selenium1.rcPlayback.run = function(settings, postRunCallback, jobStartedCallback) {
  var r = builder.selenium1.rcPlayback.makeRun(settings, builder.getScript(), postRunCallback, jobStartedCallback);
  var hostPort = settings.hostPort;
  var browserstring = settings.browserstring;
  jQuery('#steps-top')[0].scrollIntoView(false);
  jQuery('#edit-editing').hide();
  jQuery('#edit-rc-playing').show();
  jQuery('#edit-rc-stopping').hide();
  builder.views.script.clearResults();
  var baseURL = r.script.steps[0].url; // qqDPS BRITTLE!
  jQuery('#edit-clearresults-span').show();
  var msg = 'cmd=getNewBrowserSession&1=' + builder.selenium1.rcPlayback.enc(browserstring) + '&2=' + builder.selenium1.rcPlayback.enc(baseURL) + '&3=null';
  jQuery('#edit-rc-connecting').show();
  builder.selenium1.rcPlayback.post(r, msg, builder.selenium1.rcPlayback.startJob, builder.selenium1.rcPlayback.xhrfailed);
  builder.selenium1.rcPlayback.runs.push(r);
  return r;
};

builder.selenium1.rcPlayback.xhrfailed = function(r, xhr, textStatus, errorThrown) {
  jQuery('#edit-rc-connecting').hide();
  var err = "Server connection error: " + textStatus;
  if (r.currentStepIndex === -1) {
    // If we can't connect to the server right at the start, just attach the error message to the
    // first step.
    r.currentStepIndex = 0;
  }
  jQuery("#" + r.script.steps[r.currentStepIndex].id + '-content').css('background-color', '#ff3333');
  r.script.steps[r.currentStepIndex].outcome = "failure";
  r.script.steps[r.currentStepIndex].failureMessage = err;
  jQuery("#" + r.script.steps[r.currentStepIndex].id + "-error").html(err).show();
  r.result.success = false;
  r.result.errormessage = err;
  jQuery('#edit-editing').show();
  jQuery('#edit-rc-playing').hide();
  jQuery('#edit-rc-stopping').hide();
  
  builder.selenium1.rcPlayback.runs = builder.selenium1.rcPlayback.runs.filter(function(run) {
    return run != r;
  });
  
  if (r.postRunCallback) {
    r.postRunCallback(r.result);
  }
};

builder.selenium1.rcPlayback.startJob = function(r, rcResponse) {
  jQuery('#edit-rc-connecting').hide();
  if (r.jobStartedCallback) { r.jobStartedCallback(rcResponse); }
  r.session = rcResponse.substring(3);
  r.result.success = true;
  builder.selenium1.rcPlayback.playNextStep(r, null);
};

builder.selenium1.rcPlayback.playNextStep = function(r, returnVal) {
  var error = false;
  if (returnVal) {
    if (returnVal.substring(0, 2) === "OK") {
      jQuery("#" + r.script.steps[r.currentStepIndex].id + '-content').css('background-color', '#bfee85');
      r.script.steps[r.currentStepIndex].outcome = "success";
    } else if (returnVal.length >= 5 && returnVal.substring(0, 5) === "false") {
      jQuery("#" + r.script.steps[r.currentStepIndex].id + '-content').css('background-color', '#ffcccc');
      r.script.steps[r.currentStepIndex].outcome = "failure";
      r.result.success = false;
    } else {
      error = true;
      // Some error has occurred
      jQuery("#" + r.script.steps[r.currentStepIndex].id + '-content').css('background-color', '#ff3333');
      r.script.steps[r.currentStepIndex].outcome = "error";
      jQuery("#" + r.script.steps[r.currentStepIndex].id + "-error").html(" " + returnVal).show();
      r.script.steps[r.currentStepIndex].failureMessage = returnVal;
      r.result.success = false;
      r.result.errormessage = returnVal;
    }
  }
  
  if (!error) {
    // Run next step?
    if (r.requestStop) {
      r.result.success = false;
      r.result.errormessage = _t('sel1_test_stopped');
    } else {
      r.currentStepIndex++;
      // Echo is not supported server-side, so ignore it.
      while (r.currentStepIndex < r.script.steps.length && r.script.steps[r.currentStepIndex].type === builder.selenium1.stepTypes.echo) {
        jQuery("#" + r.script.steps[r.currentStepIndex].id + '-content').css('background-color', '#bfee85');
        r.script.steps[r.currentStepIndex].outcome = "success";
        r.currentStepIndex++;
      }
      if (r.currentStepIndex < r.script.steps.length) {
        var step = r.script.steps[r.currentStepIndex];
        if (step.type == builder.selenium1.stepTypes.pause) {
          r.pauseCounter = 0;
          var max = step.waitTime / 100;
          builder.stepdisplay.showProgressBar(step.id);
          r.pauseInterval = setInterval(function() {
            if (r.requestStop) {
              window.clearInterval(r.pauseInterval);
              builder.selenium1.rcPlayback.playNextStep(r, "Playback stopped");
              return;
            }
            r.pauseCounter++;
            builder.stepdisplay.setProgressBar(step.id, 100 * r.pauseCounter / max);
            if (r.pauseCounter >= max) {
              window.clearInterval(r.pauseInterval);
              builder.stepdisplay.hideProgressBar(step.id);
              builder.selenium1.rcPlayback.playNextStep(r, "OK");
            }
          }, 100);
        } else {
          builder.selenium1.rcPlayback.post(r, builder.selenium1.rcPlayback.toCmdString(step) + "&sessionId=" + r.session, builder.selenium1.rcPlayback.playNextStep);
        }
        return;
      }
    }
  }
  
  var msg = "cmd=testComplete&sessionId=" + r.session;
  builder.selenium1.rcPlayback.post(r, msg, function() {});
  jQuery('#edit-editing').show();
  jQuery('#edit-rc-playing').hide();
  jQuery('#edit-rc-stopping').hide();
  
  builder.selenium1.rcPlayback.runs = builder.selenium1.rcPlayback.runs.filter(function(run) {
    return run != r;
  });
  
  if (r.postRunCallback) {
    r.postRunCallback(r.result);
  }
};

builder.selenium1.rcPlayback.stopTest = function(r) {
  r.requestStop = true;
  jQuery('#edit-rc-playing').hide();
  jQuery('#edit-rc-stopping').show();
};

builder.selenium1.rcPlayback.post = function(r, msg, callback) {
  jQuery.ajax({
    type: "POST",
    url: "http://" + r.hostPort + "/selenium-server/driver/",
    data: msg,
    success: function(response) { callback(r, response); },
    error: function(xhr, textStatus, errorThrown) { builder.selenium1.rcPlayback.xhrfailed(r, xhr, textStatus, errorThrown); }
  });
};

builder.selenium1.rcPlayback.enc = function(str) {
  return encodeURIComponent(str)
        .replace(/%20/g, '+')
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};

/* Takes a step from a script and turns it into a string to be sent to RC. */
builder.selenium1.rcPlayback.toCmdString = function(step) {
  var str = "cmd=";
  if (step.negated) {
    str += step.type.negator(step.type.getName());
  } else {
    str += step.type.getName();
  }
  var params = step.type.getParamNames();
  for (var i = 0; i < params.length; i++) {
    str += "&" + (i + 1) + "=";
    if (step.type.getParamType(params[i]) === "locator") {
      str += builder.selenium1.rcPlayback.enc(step[params[i]].getName(builder.selenium1) + "=" + step[params[i]].getValue());
    } else {
      str += builder.selenium1.rcPlayback.enc(step[params[i]]);
    }
  }
  return str;
};
