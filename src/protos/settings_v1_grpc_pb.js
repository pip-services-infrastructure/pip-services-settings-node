// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var settings_v1_pb = require('./settings_v1_pb.js');

function serialize_settings_v1_SettingsIdPageReply(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsIdPageReply)) {
    throw new Error('Expected argument of type settings_v1.SettingsIdPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsIdPageReply(buffer_arg) {
  return settings_v1_pb.SettingsIdPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsIdRequest(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsIdRequest)) {
    throw new Error('Expected argument of type settings_v1.SettingsIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsIdRequest(buffer_arg) {
  return settings_v1_pb.SettingsIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsModifyParamsRequest(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsModifyParamsRequest)) {
    throw new Error('Expected argument of type settings_v1.SettingsModifyParamsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsModifyParamsRequest(buffer_arg) {
  return settings_v1_pb.SettingsModifyParamsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsPageRequest(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsPageRequest)) {
    throw new Error('Expected argument of type settings_v1.SettingsPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsPageRequest(buffer_arg) {
  return settings_v1_pb.SettingsPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsParamsReply(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsParamsReply)) {
    throw new Error('Expected argument of type settings_v1.SettingsParamsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsParamsReply(buffer_arg) {
  return settings_v1_pb.SettingsParamsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsParamsRequest(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsParamsRequest)) {
    throw new Error('Expected argument of type settings_v1.SettingsParamsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsParamsRequest(buffer_arg) {
  return settings_v1_pb.SettingsParamsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_settings_v1_SettingsSectionPageReply(arg) {
  if (!(arg instanceof settings_v1_pb.SettingsSectionPageReply)) {
    throw new Error('Expected argument of type settings_v1.SettingsSectionPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_settings_v1_SettingsSectionPageReply(buffer_arg) {
  return settings_v1_pb.SettingsSectionPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}


// The settings service definition.
var SettingsService = exports.SettingsService = {
  get_section_ids: {
    path: '/settings_v1.Settings/get_section_ids',
    requestStream: false,
    responseStream: false,
    requestType: settings_v1_pb.SettingsPageRequest,
    responseType: settings_v1_pb.SettingsIdPageReply,
    requestSerialize: serialize_settings_v1_SettingsPageRequest,
    requestDeserialize: deserialize_settings_v1_SettingsPageRequest,
    responseSerialize: serialize_settings_v1_SettingsIdPageReply,
    responseDeserialize: deserialize_settings_v1_SettingsIdPageReply,
  },
  get_sections: {
    path: '/settings_v1.Settings/get_sections',
    requestStream: false,
    responseStream: false,
    requestType: settings_v1_pb.SettingsPageRequest,
    responseType: settings_v1_pb.SettingsSectionPageReply,
    requestSerialize: serialize_settings_v1_SettingsPageRequest,
    requestDeserialize: deserialize_settings_v1_SettingsPageRequest,
    responseSerialize: serialize_settings_v1_SettingsSectionPageReply,
    responseDeserialize: deserialize_settings_v1_SettingsSectionPageReply,
  },
  get_section_by_id: {
    path: '/settings_v1.Settings/get_section_by_id',
    requestStream: false,
    responseStream: false,
    requestType: settings_v1_pb.SettingsIdRequest,
    responseType: settings_v1_pb.SettingsParamsReply,
    requestSerialize: serialize_settings_v1_SettingsIdRequest,
    requestDeserialize: deserialize_settings_v1_SettingsIdRequest,
    responseSerialize: serialize_settings_v1_SettingsParamsReply,
    responseDeserialize: deserialize_settings_v1_SettingsParamsReply,
  },
  set_section: {
    path: '/settings_v1.Settings/set_section',
    requestStream: false,
    responseStream: false,
    requestType: settings_v1_pb.SettingsParamsRequest,
    responseType: settings_v1_pb.SettingsParamsReply,
    requestSerialize: serialize_settings_v1_SettingsParamsRequest,
    requestDeserialize: deserialize_settings_v1_SettingsParamsRequest,
    responseSerialize: serialize_settings_v1_SettingsParamsReply,
    responseDeserialize: deserialize_settings_v1_SettingsParamsReply,
  },
  modify_section: {
    path: '/settings_v1.Settings/modify_section',
    requestStream: false,
    responseStream: false,
    requestType: settings_v1_pb.SettingsModifyParamsRequest,
    responseType: settings_v1_pb.SettingsParamsReply,
    requestSerialize: serialize_settings_v1_SettingsModifyParamsRequest,
    requestDeserialize: deserialize_settings_v1_SettingsModifyParamsRequest,
    responseSerialize: serialize_settings_v1_SettingsParamsReply,
    responseDeserialize: deserialize_settings_v1_SettingsParamsReply,
  },
};

exports.SettingsClient = grpc.makeGenericClientConstructor(SettingsService);
