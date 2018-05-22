"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
class SettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.SettingsProcess = SettingsProcess;
//# sourceMappingURL=SettingsProcess.js.map