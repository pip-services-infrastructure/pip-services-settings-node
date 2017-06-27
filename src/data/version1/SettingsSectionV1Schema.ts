import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class SettingsSectionV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('parameters', TypeCode.Map);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);
    }
}