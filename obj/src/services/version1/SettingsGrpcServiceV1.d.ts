import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class SettingsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSectionIds(call, callback);
    private getSections(call, callback);
    private getSectionById(call, callback);
    private setSection(call, callback);
    private modifySection(call, callback);
    register(): void;
}
