"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class SettingsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('settings');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}
exports.SettingsSenecaServiceV1 = SettingsSenecaServiceV1;
//# sourceMappingURL=SettingsSenecaServiceV1.js.map