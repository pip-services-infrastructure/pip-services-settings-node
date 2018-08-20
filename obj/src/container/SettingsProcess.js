"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class SettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.SettingsProcess = SettingsProcess;
//# sourceMappingURL=SettingsProcess.js.map