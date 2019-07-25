import { ConfigParams } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { SettingsSectionV1Schema } from '../data/version1/SettingsSectionV1Schema';
import { ISettingsController } from './ISettingsController';

export class SettingsCommandSet extends CommandSet {
    private _logic: ISettingsController;

    constructor(logic: ISettingsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSectionIdsCommand());
		this.addCommand(this.makeGetSectionsCommand());
		this.addCommand(this.makeGetSectionByIdCommand());
		this.addCommand(this.makeSetSectionCommand());
		this.addCommand(this.makeModifySectionCommand());
    }

	private makeGetSectionIdsCommand(): ICommand {
		return new Command(
			"get_section_ids",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getSectionIds(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetSectionsCommand(): ICommand {
		return new Command(
			"get_sections",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getSections(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetSectionByIdCommand(): ICommand {
		return new Command(
			"get_section_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                this._logic.getSectionById(correlationId, id, callback);
            }
		);
	}

	private makeSetSectionCommand(): ICommand {
		return new Command(
			"set_section",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String)
				.withRequiredProperty('parameters', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                let parameters = ConfigParams.fromValue(args.getAsObject("parameters"));
                this._logic.setSection(correlationId, id, parameters, callback);
            }
		);
	}

	private makeModifySectionCommand(): ICommand {
		return new Command(
			"modify_section",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String)
				.withOptionalProperty('update_parameters', TypeCode.Map)
				.withOptionalProperty('increment_parameters', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                let updateParams = ConfigParams.fromValue(args.getAsObject("update_parameters"));
                let incrementParams = ConfigParams.fromValue(args.getAsObject("increment_parameters"));
                this._logic.modifySection(correlationId, id, updateParams, incrementParams, callback);
            }
		);
	}

}