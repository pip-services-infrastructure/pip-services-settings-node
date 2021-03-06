"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SettingsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}
exports.SettingsHttpServiceV1 = SettingsHttpServiceV1;
//# sourceMappingURL=SettingsHttpServiceV1.js.map