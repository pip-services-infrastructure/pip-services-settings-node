let _ = require('lodash');
let messages = require('../../../../src/protos/settings_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { SettingsSectionV1 } from '../../data/version1/SettingsSectionV1';

export class SettingsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        SettingsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: SettingsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        SettingsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromSettingsSection(section: SettingsSectionV1): any {
        if (section == null) return null;

        let obj = new messages.SettingsSection();

        obj.setId(section.id);
        obj.setUpdateTime(StringConverter.toString(section.update_time))
        SettingsGrpcConverterV1.setMap(obj.getParametersMap(), section.parameters);

        return obj;
    }

    public static toSettingsSection(obj: any): SettingsSectionV1 {
        if (obj == null) return null;

        let section: SettingsSectionV1 = {
            id: obj.getId(),
            update_time: DateTimeConverter.toDateTime(obj.getUpdateTime()),
            parameters: ConfigParams.fromValue(SettingsGrpcConverterV1.getMap(obj.getParametersMap()))
        };

        return section;
    }

    public static fromSettingsSectionPage(page: DataPage<SettingsSectionV1>): any {
        if (page == null) return null;

        let obj = new messages.SettingsSectionPage();

        obj.setTotal(page.total);
        let data = _.map(page.data, SettingsGrpcConverterV1.fromSettingsSection);
        obj.setDataList(data);

        return obj;
    }

    public static toSettingsSectionPage(obj: any): DataPage<SettingsSectionV1> {
        if (obj == null) return null;

        let data = _.map(obj.getDataList(), SettingsGrpcConverterV1.toSettingsSection);
        let page: DataPage<SettingsSectionV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

    public static fromSettingsIdPage(page: DataPage<string>): any {
        if (page == null) return null;

        let obj = new messages.SettingsIdPage();

        obj.setTotal(page.total);
        obj.setDataList(page.data);

        return obj;
    }

    public static toSettingsIdPage(obj: any): DataPage<string> {
        if (obj == null) return null;

        let page: DataPage<string> = {
            total: obj.getTotal(),
            data: obj.getDataList()
        };

        return page;
    }

}