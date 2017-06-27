let SettingsProcess = require('../obj/src/container/SettingsProcess').SettingsProcess;

try {
    new SettingsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
