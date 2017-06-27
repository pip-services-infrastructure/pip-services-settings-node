"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class SettingsSectionV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('parameters', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);
    }
}
exports.SettingsSectionV1Schema = SettingsSectionV1Schema;
//# sourceMappingURL=SettingsSectionV1Schema.js.map