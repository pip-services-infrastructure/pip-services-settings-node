// package: settings_v1
// file: settings_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class SettingsSection extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  getUpdateTime(): string;
  setUpdateTime(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsSection.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsSection): SettingsSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsSection;
  static deserializeBinaryFromReader(message: SettingsSection, reader: jspb.BinaryReader): SettingsSection;
}

export namespace SettingsSection {
  export type AsObject = {
    id: string,
    parametersMap: Array<[string, string]>,
    updateTime: string,
  }
}

export class SettingsSectionPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<SettingsSection>;
  setDataList(value: Array<SettingsSection>): void;
  addData(value?: SettingsSection, index?: number): SettingsSection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsSectionPage.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsSectionPage): SettingsSectionPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsSectionPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsSectionPage;
  static deserializeBinaryFromReader(message: SettingsSectionPage, reader: jspb.BinaryReader): SettingsSectionPage;
}

export namespace SettingsSectionPage {
  export type AsObject = {
    total: number,
    dataList: Array<SettingsSection.AsObject>,
  }
}

export class SettingsIdPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<string>;
  setDataList(value: Array<string>): void;
  addData(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsIdPage.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsIdPage): SettingsIdPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsIdPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsIdPage;
  static deserializeBinaryFromReader(message: SettingsIdPage, reader: jspb.BinaryReader): SettingsIdPage;
}

export namespace SettingsIdPage {
  export type AsObject = {
    total: number,
    dataList: Array<string>,
  }
}

export class SettingsPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsPageRequest): SettingsPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsPageRequest;
  static deserializeBinaryFromReader(message: SettingsPageRequest, reader: jspb.BinaryReader): SettingsPageRequest;
}

export namespace SettingsPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class SettingsIdPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): SettingsIdPage | undefined;
  setPage(value?: SettingsIdPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsIdPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsIdPageReply): SettingsIdPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsIdPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsIdPageReply;
  static deserializeBinaryFromReader(message: SettingsIdPageReply, reader: jspb.BinaryReader): SettingsIdPageReply;
}

export namespace SettingsIdPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: SettingsIdPage.AsObject,
  }
}

export class SettingsSectionPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): SettingsSectionPage | undefined;
  setPage(value?: SettingsSectionPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsSectionPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsSectionPageReply): SettingsSectionPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsSectionPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsSectionPageReply;
  static deserializeBinaryFromReader(message: SettingsSectionPageReply, reader: jspb.BinaryReader): SettingsSectionPageReply;
}

export namespace SettingsSectionPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: SettingsSectionPage.AsObject,
  }
}

export class SettingsIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsIdRequest): SettingsIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsIdRequest;
  static deserializeBinaryFromReader(message: SettingsIdRequest, reader: jspb.BinaryReader): SettingsIdRequest;
}

export namespace SettingsIdRequest {
  export type AsObject = {
    correlationId: string,
    id: string,
  }
}

export class SettingsParamsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getId(): string;
  setId(value: string): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsParamsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsParamsRequest): SettingsParamsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsParamsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsParamsRequest;
  static deserializeBinaryFromReader(message: SettingsParamsRequest, reader: jspb.BinaryReader): SettingsParamsRequest;
}

export namespace SettingsParamsRequest {
  export type AsObject = {
    correlationId: string,
    id: string,
    parametersMap: Array<[string, string]>,
  }
}

export class SettingsModifyParamsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getId(): string;
  setId(value: string): void;

  getUpdateParametersMap(): jspb.Map<string, string>;
  clearUpdateParametersMap(): void;
  getIncrementParametersMap(): jspb.Map<string, string>;
  clearIncrementParametersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsModifyParamsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsModifyParamsRequest): SettingsModifyParamsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsModifyParamsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsModifyParamsRequest;
  static deserializeBinaryFromReader(message: SettingsModifyParamsRequest, reader: jspb.BinaryReader): SettingsModifyParamsRequest;
}

export namespace SettingsModifyParamsRequest {
  export type AsObject = {
    correlationId: string,
    id: string,
    updateParametersMap: Array<[string, string]>,
    incrementParametersMap: Array<[string, string]>,
  }
}

export class SettingsParamsReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettingsParamsReply.AsObject;
  static toObject(includeInstance: boolean, msg: SettingsParamsReply): SettingsParamsReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettingsParamsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettingsParamsReply;
  static deserializeBinaryFromReader(message: SettingsParamsReply, reader: jspb.BinaryReader): SettingsParamsReply;
}

export namespace SettingsParamsReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    parametersMap: Array<[string, string]>,
  }
}

