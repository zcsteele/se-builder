var m = {};
builder.translate.addLocale({'name':'en-US', 'title': "English", 'mapping': m});

// Locale selection GUI
m.select_locale = "Select language";
m.cancel = "Cancel";
m.new_locale_after_restart = "Language will change after Builder restart.";

// Startup view
m.open_script_or_suite = "Open a script or suite";
m.view_command_table = "View supported commands for Selenium 1 & 2";
m.manage_plugins = "Manage plugins"
m.start_recording_at = "Start recording at";
m.cookie_warning = "This will delete all cookies for the domain you're recording for.";

// Steps table
m.steps_table = "Steps Table";
m.show_step_type_orphans = "Show Selenium 1 steps that have no corresponding Selenium 2 step.";
m.step_name = "Name";
m.sel_1_translation = "Selenium 1 Translation";
m.negatable = "Negatable";
m.local_playback_available = "Local Playback";
m.yes = "yes"; // Yes means yes.
m.no = "no";   // No means no.
               // Oh no! Politics in our source code!

// Plugins
m.plugins_title = "Plugins";
m.plugins_back = "Back";
m.plugins_refresh = "Refresh";
m.plugins_loading = "Loading...";
m.plugins_downloading = "Downloading...";
m.plugin_disabled = "Disabled";
m.plugin_installed = "Installed";
m.plugin_installed_to_enable = "Installed, Enabled after Restart";
m.plugin_installed_to_disable = "Installed, Disabled after Restart";
m.plugin_not_installed = "Not Installed";
m.plugin_to_install = "Installed after Restart";
m.plugin_to_uninstall = "Uninstalled after Restart";
m.plugin_to_update = "Installed, Updated after Restart";
m.plugin_update_available = ", update to version {0} available";
m.plugin_install = "Install";
m.plugin_cancel_install = "Cancel Install";
m.plugin_uninstall = "Uninstall";
m.plugin_cancel_uninstall = "Cancel Uninstall";
m.plugin_update = "Update";
m.plugin_cancel_update = "Cancel Update";
m.plugin_enable = "Enable";
m.plugin_disable = "Disable";

// Menus
m.menu_file = "File";
m.menu_record = "Record";
m.menu_run = "Run";
m.menu_suite = "Suite";
m.menu_save = "Save";
m.menu_convert = "Convert to other version...";
m.menu_discard = "Discard and start over";
m.menu_run_locally = "Run test locally";
m.menu_run_on_rc = "Run on Selenium Server";
m.menu_run_suite_locally = "Run suite locally";
m.menu_run_suite_on_rc = "Run suite on Selenium Server";
m.menu_suite_remove_script = "Remove current script";
m.menu_add_script_from_file = "Add script from file";
m.menu_record_new_script = "Record new script";
m.menu_discard_suite = "Discard and start over";
m.menu_save_suite = "Save suite";
m.menu_save_suite_as = "Save suite as...";

// Script
m.untitled_script = "Untitled Script";

// Step display
m.suite_has_unsaved_changes = "Suite has unsaved changes.";
m.suite_cannot_save_unsaved_scripts = "Can't save suite: Save all scripts to disk as HTML first.";
m.cannot_save_suite_due_to_mixed_versions = "Can't save suite: All scripts must be Selenium 1 scripts.";
m.stop_playback = "Stop Playback";
m.stopping = "Stopping...";
m.clear_results = "Clear Results";
m.connecting = "Connecting...";
m.record_verification = "Record a verification";
m.stop_recording = "Stop recording";