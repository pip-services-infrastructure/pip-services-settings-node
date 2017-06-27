"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
class SettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory);
    }
}
exports.SettingsProcess = SettingsProcess;
//# sourceMappingURL=SettingsProcess.js.map