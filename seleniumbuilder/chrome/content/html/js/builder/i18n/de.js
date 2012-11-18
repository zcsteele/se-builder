var m = {};
builder.translate.addLocale({'name':'de', 'title': "Deutsch", 'mapping': m});

// General
m.ok = "OK";
m.cancel = "Abbrechen";

// Lang selection
m.select_locale = "Sprache auswählen";
m.new_locale_after_restart = "Sprache ändert nach Neustart von Builder.";

m.open_script_or_suite = "Skript oder Suite öffnen";
m.view_command_table = "Tabelle verfügbarer Schritt-Typen für Selenium 1 & 2";
m.manage_plugins = "Plugins verwalten";
m.start_recording_at = "Aufzeichnung beginnen auf";
m.cookie_warning = "Achtung: Alle Cookies für diese Domain werden bei Beginn der Aufzeichnung gelöscht.";

m.steps_table = "Tabelle der Schritt-Typen";
m.step_name = "Name";
m.sel_1_translation = "Selenium 1 Übersetzung";
m.negatable = "Umkehrbar";
m.local_playback_available = "Lokal Abspielbar";
m.yes = "ja";
m.no = "nein";
m.show_step_type_orphans = "Selenium 1 Schritt-Typen die keinen korrespondierenden Selenium 2 Typ haben, anzeigen.";

m.plugins_title = "Plugins";
m.plugins_back = "Zurück";
m.plugins_refresh = "Neu laden";
m.plugins_reboot = "Neustart";
m.plugins_loading = "Lade Plugins...";
m.plugins_downloading = "Lade Plugin...";
m.plugin_disabled = "Deaktiviert";
m.plugin_installed = "Installiert";
m.plugin_installed_to_enable = "Installiert, nach Neustart aktiviert";
m.plugin_installed_to_disable = "Installiert, nach Neustart deaktiviert";
m.plugin_not_installed = "Nicht installiert";
m.plugin_to_install = "Nach Neustart installiert";
m.plugin_to_uninstall = "Nach Neustart deinstalliert";
m.plugin_to_update = "Installiert, nach Neustart aktualisiert";
m.plugin_update_available = ", neue Version {0} verfügbar";
m.plugin_install = "Installieren";
m.plugin_install_and_reboot = "Installieren and Neustarten";
m.plugin_cancel_install = "Installierung Abbrechen";
m.plugin_uninstall = "Deinstallieren";
m.plugin_uninstall_and_reboot = "Deinstallieren und Neustarten";
m.plugin_cancel_uninstall = "Deinstallierung Abbrechen";
m.plugin_update = "Aktualisieren";
m.plugin_update_and_reboot = "Aktualisieren und Neustarten";
m.plugin_cancel_update = "Aktualisierung Abbrechen";
m.plugin_enable = "Aktivieren";
m.plugin_enable_and_reboot = "Aktivieren und Neustarten";
m.plugin_disable = "Deaktivieren";
m.plugin_disable_and_reboot = "Deaktivieren und Neustarten";
m.plugin_list_too_new = "Diese Version von Builder ist zu alt um die Liste der Plugins abzurufen können.";
m.unable_to_fetch_plugins = "Plugins können nicht abgerufen werden";
m.plugin_url_not_found = "konnte nicht gefunden werden";
m.plugin_missing_dir = "Der Plugin-Ordner {0} fehlt.";
m.plugin_not_a_dir = "Der Standort des Plugins, {0}, ist kein Ordner, sondern ein Dokument.";
m.plugin_header_missing = "Das Header-Dokument des Plugins {0} fehlt.";
m.plugin_header_not_file = "Das Header-Dokument des Plugins {0} ist kein Dokument.";
m.plugin_header_file_corrupted = "Das Header-Dokument {0} is korrumpiert, hat einen Syntax-Fehler, oder ist kein JSON-Dokument: {1}";
m.plugin_header_file_no_version = "Das Header-Dokument {0} enthält keine Versions-Information.";
m.plugin_builder_too_old = "Diese Version von Builder ist für dieses Plugin zu alt. Aktualisieren Sie bitte auf die neuste Version.";
m.plugin_id_mismatch = "Die ID im Header-Dokument ({0}) unterscheidet sich von der erwarteten ID ({1}).";
m.plugin_cant_verify = "Plugin konnte nicht geprüft werden: {0}";
m.plugin_unable_to_install = "{0} konnte nicht installiert werden: {1}";
m.plugin_unable_to_uninstall = "{0} konnte nicht deinstalliert werden: {1}";
m.plugin_disabled_builder_too_old = "Das Plugin \"{0}\" wurde deaktiviert. Diese Version von Builder ist für dieses Plugin zu alt.\nNötige Version: {1}\nMomentane Version: {2}\nAktualisieren Sie Builder und reaktivieren Sie das Plugin.";
m.plugin_disabled_builder_too_new = "Das Plugin \"{0}\" wurde deaktiviert. Diese Version des Plugins ist für Builder zu alt.\nAktualisieren Sie das Plugin.";
m.cant_update_builder_too_old = ", neue Version {0} ist inkompatibel: Builder ist zu alt";
m.cant_update_builder_too_new = ", neue Version {0} ist inkompatibel: das Plugin ist zu alt";
m.cant_install_builder_too_old = "; kann nicht installiert werden: Builder ist zu alt";
m.cant_install_builder_too_new = "; kann nicht installiert werden: das Plugin ist zu alt";

// Menus
m.menu_file = "Dokument";
m.menu_record = "Aufzeichnen";
m.menu_run = "Abspielen";
m.menu_suite = "Suite";
m.menu_save = "Speichern";
m.menu_convert = "Version konvertieren...";
m.menu_discard = "Skript schliessen";
m.menu_run_locally = "Skript im Browser abspielen";
m.menu_run_on_rc = "Skript auf Selenium Server abspielen";
m.menu_run_suite_locally = "Suite im Browser abspielen";
m.menu_run_suite_on_rc = "Suite auf Selenium Server abspielen";
m.menu_suite_remove_script = "Skript aus Suite entfernen";
m.menu_add_script_from_file = "Skript hinzufügen";
m.menu_record_new_script = "Neues Skript aufzeichnen";
m.menu_discard_suite = "Suite schliessen";
m.menu_save_suite = "Suite speichern";
m.menu_save_suite_as = "Suite speichern unter...";
m.lose_changes_warning = "Wenn Sie fortfahren, verlieren Sie alle Ihre letzten Änderungen.";

// Script
m.untitled_script = "Ohne Titel";
m.suite_has_unsaved_changes = "Diese Version der Suite wurde noch nicht gespeichert.";
m.suite_cannot_save_unsaved_scripts = "Suite kann nicht gespeichert werden weil manche Skripts noch nicht gespeichert sind.";
m.cannot_save_suite_due_to_mixed_versions = "Suite kann nicht gespeichert werden weil nicht alle Skripts in Selenium-Version 1 sind.";
m.stop_playback = "Abspielen beenden";
m.stopping = "Beende...";
m.clear_results = "Resultat zurücksetzen";
m.connecting = "Verbinde...";
m.record_verification = "Verifikation aufzeichnen";
m.stop_recording = "Aufzeichnung beenden";

// Convert dialog
m.script_conversion = "Konvertieren";
m.the_following_steps_cant_be_converted = "Die folgenden Schritte können nicht konvertiert werden";

// Export dialog
m.choose_export_format = "Exportformat auswählen";
m.sel2_unsaveable_steps = "Dieses Skript enthält Schritte die nicht in Selenium 2 konvertiert werden können";
m.save = "Speichern";
m.unsupported_steps = "Nicht unterstützt";
m.save_as_X_to_Y = "Als {0} auf {1} speichern";

// RC dialog
m.run_script = "Abspielen";
m.selenium_rc_settings = "Selenium RC Einstellungen";
m.rc_server_host_port = "Host:Port des RC-Servers";
m.rc_browser_string = "Browser-String";
m.rc_browser_version = "Browser-Version";
m.rc_platform = "Plattform";

// Record dialog
m.start_recording_new_script_at = "Neues Skript aufzeichnen auf";

// Run all dialog
m.view_run_result = "Resultat anzeigen";
m.running_scripts = "Skripte werden abgespielt...";
m.stop = "Stopp";
m.close = "Schliessen";
m.done_exclamation = "Abgeschlossen!";

// Suite
m.cant_save_suite_must_save_as_html = "Suite kann nicht gespeichert werden. Bitte speichern Sie zuerst alle Skripte als HTML.";
m.cant_save_suite_must_be_sel1 = "Suite kann nicht gespeichert werden. Alle Skripte müssen Selenium 1 sein.";

// Gui
m.unsaved_changes_warning = "Alle nicht gespeicherten Änderungen gehen dabei verloren.";

// UI
m.unable_to_read_file = "Dokument kann nicht gelesen werden.";
m.select_a_file = "Dokument auswählen";

// Record
m.record_invalid_url = "Das URL ist ungültig und kann nicht geladen werden.";

// Sel 1
m.sel1_could_not_open_suite_script = "Suite konnte nicht geöffnet werden, da das Skript {0} nicht geöffnet werden konnte.";
m.sel1_couldnt_save_suite = "Suite konnte nicht gespeichert werden:\n{0}";
m.sel1_couldnt_export_script = "Skript konnte nicht geöffnet werden:\n{0}";
m.sel1_playback_failed = "Versagt";
m.sel1_unknown_failure_reason = "Unbekannter Grund";
m.sel1_test_stopped = "Abspielen abgebrochen";

// Sel 2
m.save_as = "Speichern unter...";
m.sel2_cant_export_step_type = "Schrittyp \"{0}\" kann nicht exportiert werden.";
m.sel2_variable_not_set = "Variable nicht definiert: {0}.";
m.sel2_text_not_present = "Text nicht vorhanden.";
m.sel2_body_text_does_not_match = "Body-Text unterscheidet sich.";
m.sel2_element_not_found = "Element nicht gefunden.";
m.sel2_source_does_not_match = "Quelltext unterscheidet sich.";
m.sel2_element_text_does_not_match = "Element-Text unterscheidet sich.";
m.sel2_url_does_not_match = "URL unterscheidet sich.";
m.sel2_title_does_not_match = "Titel unterscheidet sich.";
m.sel2_element_not_selected = "Element nicht selektiert.";
m.sel2_element_value_doesnt_match = "Element-Wert unterscheidet sich.";
m.sel2_attribute_value_doesnt_match = "Attribut unterscheidet sich.";
m.sel2_cookie_value_doesnt_match = "Cookie-Wert unterscheidet sich.";
m.sel2_no_cookie_found = "Kein Cookie mit diesem Namen gefunden.";
m.sel2_step_not_implemented_for_playback = "{0} ist nicht zum Abspielen implementiert.";
m.sel2_is = "ist";
m.sel2_true = "wahr";
m.sel2_false = "nicht wahr";
m.sel2_untitled_run = "Ohne Titel";
m.sel2_server_error = "Server-Fehler";

// Step display
m.param_expr_info = "<br>Parameter-Ausdrücke der Form  <i>${name der variable}</i> werden durch den Inhalt dieser Variable ersetzt.";
m.negate_assertion_or_verification = "Benötigung/Verifikation umkehren";
m.find_a_different_target = "Anderes Zielelement aussuchen";
m.suggested_locator_alternatives = "Andere Locators:";
m.step_edit_type = "Typ ändern";
m.step_delete = "Schritt löschen";
m.step_new_above = "neuer Schritt oben";
m.step_new_below = "neuer Schritt unten";
m.step_run = "Schritt abspielen";
m.step_run_from_here = "ab hier abspielen";
m.step_run_to_here = "bis hier abspielen";
m.playback_not_supported_warning = "Achtung: dieser Schrittyp kann nicht abgespielt werden.";
m.edit_p = "{0} ändern";
m.not = "nicht";

// IO
m.script_is_empty = "Skript ist leer.";
m.suite_is_empty = "Suite ist leer.";
m.suite = "Suite";

// Selenium 2 Categories
m.navigation_sel2_cat = "Navigieren";
m.input_sel2_cat = "Eingabe";
m.misc_sel2_cat = "Andere";
m.assertion_sel2_cat = "Prüfen";
m.verify_sel2_cat = "Verifikation";
m.wait_sel2_cat = "Warten";
m.store_sel2_cat = "Speichern";

// Selenium 2 step types
m.step_get = "gehe zu";
m.step_goBack = "zurück";
m.step_goForward = "forwärts";
m.step_clickElement = "Element anklicken";
m.step_setElementText = "Element-Text setzen";
m.step_sendKeysToElement = "Element-Text eingeben";
m.step_clickElementWithOffset = "Element mit Verschiebung anklicken";
m.step_doubleClickElement = "Element doppelklicken";
m.step_dragToAndDropElement = "drag&drop Element";
m.step_clickAndHoldElement = "Element ohne loszulassen anklicken";
m.step_releaseElement = "Element loslassen";
m.step_setElementSelected = "Element selektieren";
m.step_clearSelections = "Alle deselektieren";
m.step_setElementNotSelected = "Element deselektieren";
m.step_submitElement = "Formular abschicken";
m.step_close = "schliessen";
m.step_refresh = "neu laden";
m.step_assertTextPresent = "Text vorhanden? (nötig)";
m.step_verifyTextPresent = "Text vorhanden? (Verifikation)";
m.step_waitForTextPresent = "warten bis Text vorhanden ist";
m.step_storeTextPresent = "Text-Präsenz speichern";
m.step_assertBodyText = "Body-Text prüfen (nötig)";
m.step_verifyBodyText = "Body-Text prüfen (Verifikation)";
m.step_waitForBodyText = "auf Body-Text warten";
m.step_storeBodyText = "Body-Text speichern";
m.step_assertElementPresent = "Element vorhanden? (nötig)";
m.step_verifyElementPresent = "Element vorhanden? (Verifikation)";
m.step_waitForElementPresent = "warte auf Element-Präsenz";
m.step_storeElementPresent = "Element-Präsenz speichern";
m.step_assertPageSource = "Quelltext prüfen (nötig)";
m.step_verifyPageSource = "Quelltext prüfen (Verifikation)";
m.step_waitForPageSource = "auf Quelltext warten";
m.step_storePageSource = "Quelltext speichern";
m.step_assertText = "Element-Text vorhanden? (nötig)";
m.step_verifyText = "Element-Text vorhanden? (Verifikation)";
m.step_waitForText = "auf Element-Text warten";
m.step_storeText = "Element-Text speichern";
m.step_assertCurrentUrl = "URL prüfen (nötig)";
m.step_verifyCurrentUrl = "URL prüfen (Verifikation)";
m.step_waitForCurrentUrl = "auf URL warten";
m.step_storeCurrentUrl = "URL speichern";
m.step_assertTitle = "Titel prüfen (nötig)";
m.step_verifyTitle = "Titel prüfen (Verifikation)";
m.step_waitForTitle = "auf Titel warten";
m.step_storeTitle = "Titel speichern";
m.step_assertElementAttribute = "Attribut prüfen (nötig)";
m.step_verifyElementAttribute = "Attribut prüfen (Verifikation)";
m.step_waitForElementAttribute = "auf Attribut warten";
m.step_storeElementAttribute = "Attribut speichern";
m.step_assertElementSelected = "Element selektiert? (nötig)";
m.step_verifyElementSelected = "Element selektiert? (Verifikation)";
m.step_waitForElementSelected = "auf Element-Selektion warten";
m.step_storeElementSelected = "Element-Selektion speichern";
m.step_assertElementValue = "Element-Wert prüfen (nötig)";
m.step_verifyElementValue = "Element-Wert prüfen (Verifikation)";
m.step_waitForElementValue = "auf Element-Wert warten";
m.step_storeElementValue = "Element-Wert speichern";
m.step_addCookie = "neues Cookie";
m.step_deleteCookie = "Cookie löschen";
m.step_assertCookieByName = "Cookie-Wert prüfen (nötig)";
m.step_verifyCookieByName = "Cookie-Wert prüfen (Verifikation)";
m.step_waitForCookieByName = "auf Cookie-Wert warten";
m.step_storeCookieByName = "Cookie-Wert speichern";
m.step_assertCookiePresent = "Cookie-Präsenz prüfen (nötig)";
m.step_verifyCookiePresent = "Cookie-Präsenz prüfen (nötig)";
m.step_waitForCookiePresent = "auf Cookie warten";
m.step_storeCookiePresent = "Cookie-Präsenz speichern";
m.step_saveScreenshot = "Bildschirmfotografie";
m.step_switchToFrame = "Frame wechseln";
m.step_switchToFrameByIndex = "Zu Frame mit Index wechseln";
m.step_switchWindow = "Fenster wechseln";
m.step_switchToDefaultContent = "Zur Hauptframe wechseln";
m.step_print = "Angabe";
m.step_store = "Wert speichern";
m.step_pause = "Pause";
m.p_attributeName = "Attribut-Name";
m.p_file = "Dokument";
m.p_locator = "Locator";
m.p_name = "Name";
m.p_offset = "Verschiebung";
m.p_options = "Optionen";
m.p_source = "Quelle";
m.p_targetLocator = "Ziel-Locator";
m.p_text = "Text";
m.p_title = "Titel";
m.p_url = "URL";
m.p_value = "Wert";
m.p_variable = "Variable";
m.p_waitTime = "Wartezeit";
m.p_identifier = "Identifikator";
m.p_index = "Index";
m.p_name = "Name";