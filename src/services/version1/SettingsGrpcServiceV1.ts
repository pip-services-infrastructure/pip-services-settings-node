let _ = require('lodash');
let services = require('../../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../../src/protos/settings_v1_pb');

import { IReferences, ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { SettingsSectionV1 } from '../../data/version1/SettingsSectionV1';
import { SettingsSectionV1Schema } from '../../data/version1/SettingsSectionV1Schema';
import { ISettingsController } from '../../logic/ISettingsController';
import { SettingsGrpcConverterV1 } from './SettingsGrpcConverterV1';

export class SettingsGrpcServiceV1 extends GrpcService {
    private _controller: ISettingsController;
	
    public constructor() {
        super(services.SettingsService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-settings", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<ISettingsController>('controller');
    }
    
    private getSectionIds(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getSectionIds(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = SettingsGrpcConverterV1.fromError(err);
                let page = err == null ? SettingsGrpcConverterV1.fromSettingsIdPage(result) : null;

                let response = new messages.SettingsIdPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getSections(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        SettingsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SettingsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getSections(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = SettingsGrpcConverterV1.fromError(err);
                let page = err == null ? SettingsGrpcConverterV1.fromSettingsSectionPage(result) : null;

                let response = new messages.SettingsSectionPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getSectionById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();

        this._controller.getSectionById(
            correlationId,
            id,
            (err, result) => {
                let error = SettingsGrpcConverterV1.fromError(err);

                let response = new messages.SettingsParamsReply();
                response.setError(error);
                SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);

                callback(err, response);
            }
        );
    }

    private setSection(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let params = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getParametersMap()));

        this._controller.setSection(
            correlationId,
            id, params,
            (err, result) => {
                let error = SettingsGrpcConverterV1.fromError(err);

                let response = new messages.SettingsParamsReply();
                response.setError(error);
                SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);

                callback(err, response);
            }
        );
    }

    private modifySection(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getId();
        let updateParams = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getUpdateParametersMap()));
        let incrementParams = ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(call.request.getIncrementParametersMap()));

        this._controller.modifySection(
            correlationId,
            id, updateParams, incrementParams,
            (err, result) => {
                let error = SettingsGrpcConverterV1.fromError(err);

                let response = new messages.SettingsParamsReply();
                response.setError(error);
                SettingsGrpcConverterV1.setMap(response.getParametersMap(), result);

                callback(err, response);
            }
        );
    }

    public register() {
        this.registerMethod(
            'get_section_ids', 
            null,
            this.getSectionIds
        );

        this.registerMethod(
            'get_sections', 
            null,
            this.getSections
        );

        this.registerMethod(
            'get_section_by_id', 
            null,
            this.getSectionById
        );

        this.registerMethod(
            'set_section', 
            null,
            this.setSection
        );

        this.registerMethod(
            'modify_section', 
            null,
            this.modifySection
        );

    }
}
