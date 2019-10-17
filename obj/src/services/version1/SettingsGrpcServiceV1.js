"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../../src/protos/settings_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const SettingsGrpcConverterV1_1 = require("./SettingsGrpcConverterV1");
class SettingsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.SettingsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-settings", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getSectionIds(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_3.FilterParams();
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getSectionIds(correlationId, filter, paging, (err, result) => {
            let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
            let page = err == null ? SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromSettingsIdPage(result) : null;
            let response = new messages.SettingsIdPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getSections(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_3.FilterParams();
        SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getSections(correlationId, filter, paging, (err, result) => {
            let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
            let page = err == null ? SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromSettingsSectionPage(result) : null;
            let response = new messages.SettingsSectionPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getSectionById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        this._controller.getSectionById(correlationId, id, (err, result) => {
            let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    setSection(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let params = pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getParametersMap()));
        this._controller.setSection(correlationId, id, params, (err, result) => {
            let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    modifySection(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let updateParams = pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getUpdateParametersMap()));
        let incrementParams = pip_services3_commons_node_1.ConfigParams.fromValue(SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.getMap(call.request.getIncrementParametersMap()));
        this._controller.modifySection(correlationId, id, updateParams, incrementParams, (err, result) => {
            let error = SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.fromError(err);
            let response = new messages.SettingsParamsReply();
            response.setError(error);
            SettingsGrpcConverterV1_1.SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_section_ids', null, this.getSectionIds);
        this.registerMethod('get_sections', null, this.getSections);
        this.registerMethod('get_section_by_id', null, this.getSectionById);
        this.registerMethod('set_section', null, this.setSection);
        this.registerMethod('modify_section', null, this.modifySection);
    }
}
exports.SettingsGrpcServiceV1 = SettingsGrpcServiceV1;
//# sourceMappingURL=SettingsGrpcServiceV1.js.map