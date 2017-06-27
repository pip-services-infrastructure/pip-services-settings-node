import { ConfigParams } from 'pip-services-commons-node';
import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class SettingsSectionV1 implements IStringIdentifiable {
    constructor(id: string, parameters?: ConfigParams);
    id: string;
    parameters: ConfigParams;
    update_time: Date;
}
