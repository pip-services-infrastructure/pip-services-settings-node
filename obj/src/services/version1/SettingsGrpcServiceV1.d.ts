import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class SettingsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSectionIds;
    private getSections;
    private getSectionById;
    private setSection;
    private modifySection;
    register(): void;
}
