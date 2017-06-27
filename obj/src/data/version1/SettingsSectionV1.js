"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
class SettingsSectionV1 {
    constructor(id, parameters) {
        this.id = id;
        this.parameters = parameters || new pip_services_commons_node_1.ConfigParams();
        this.update_time = new Date();
    }
}
exports.SettingsSectionV1 = SettingsSectionV1;
//# sourceMappingURL=SettingsSectionV1.js.map