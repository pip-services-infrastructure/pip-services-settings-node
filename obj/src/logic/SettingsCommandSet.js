"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const pip_services_commons_node_9 = require("pip-services-commons-node");
class SettingsCommandSet extends pip_services_commons_node_2.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSectionIdsCommand());
        this.addCommand(this.makeGetSectionsCommand());
        this.addCommand(this.makeGetSectionByIdCommand());
        this.addCommand(this.makeSetSectionCommand());
        this.addCommand(this.makeModifySectionCommand());
    }
    makeGetSectionIdsCommand() {
        return new pip_services_commons_node_3.Command("get_section_ids", new pip_services_commons_node_6.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_9.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_4.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_5.PagingParams.fromValue(args.get("paging"));
            this._logic.getSectionIds(correlationId, filter, paging, callback);
        });
    }
    makeGetSectionsCommand() {
        return new pip_services_commons_node_3.Command("get_sections", new pip_services_commons_node_6.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_9.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_4.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_5.PagingParams.fromValue(args.get("paging"));
            this._logic.getSections(correlationId, filter, paging, callback);
        });
    }
    makeGetSectionByIdCommand() {
        return new pip_services_commons_node_3.Command("get_section_by_id", new pip_services_commons_node_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_7.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.getSectionById(correlationId, id, callback);
        });
    }
    makeSetSectionCommand() {
        return new pip_services_commons_node_3.Command("set_section", new pip_services_commons_node_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_7.TypeCode.String)
            .withRequiredProperty('parameters', pip_services_commons_node_7.TypeCode.Map), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            let parameters = pip_services_commons_node_1.ConfigParams.fromValue(args.getAsObject("parameters"));
            this._logic.setSection(correlationId, id, parameters, callback);
        });
    }
    makeModifySectionCommand() {
        return new pip_services_commons_node_3.Command("modify_section", new pip_services_commons_node_6.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_7.TypeCode.String)
            .withOptionalProperty('update_parameters', pip_services_commons_node_7.TypeCode.Map)
            .withOptionalProperty('increment_parameters', pip_services_commons_node_7.TypeCode.Map), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            let updateParams = pip_services_commons_node_1.ConfigParams.fromValue(args.getAsObject("update_params"));
            let incrementParams = pip_services_commons_node_1.ConfigParams.fromValue(args.getAsObject("increment_params"));
            this._logic.modifySection(correlationId, id, updateParams, incrementParams, callback);
        });
    }
}
exports.SettingsCommandSet = SettingsCommandSet;
//# sourceMappingURL=SettingsCommandSet.js.map