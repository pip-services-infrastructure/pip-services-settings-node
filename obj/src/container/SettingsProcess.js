"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class SettingsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.SettingsProcess = SettingsProcess;
//# sourceMappingURL=SettingsProcess.js.map