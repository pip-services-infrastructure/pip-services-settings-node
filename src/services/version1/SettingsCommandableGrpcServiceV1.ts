import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class SettingsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}