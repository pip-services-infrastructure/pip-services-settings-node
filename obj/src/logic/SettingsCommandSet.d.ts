import { CommandSet } from 'pip-services-commons-node';
import { ISettingsController } from './ISettingsController';
export declare class SettingsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISettingsController);
    private makeGetSectionIdsCommand();
    private makeGetSectionsCommand();
    private makeGetSectionByIdCommand();
    private makeSetSectionCommand();
    private makeModifySectionCommand();
}
