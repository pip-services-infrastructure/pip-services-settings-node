import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { SettingsSectionV1 } from '../../data/version1/SettingsSectionV1';
export declare class SettingsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromSettingsSection(section: SettingsSectionV1): any;
    static toSettingsSection(obj: any): SettingsSectionV1;
    static fromSettingsSectionPage(page: DataPage<SettingsSectionV1>): any;
    static toSettingsSectionPage(obj: any): DataPage<SettingsSectionV1>;
    static fromSettingsIdPage(page: DataPage<string>): any;
    static toSettingsIdPage(obj: any): DataPage<string>;
}
