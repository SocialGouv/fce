import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import * as fs from "fs";
import * as path from "path";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";
import {archiveFile} from "../../utils/minio";
import {createMinioClient} from "../../clients/minio";

export class Archive implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Archive Minio file',
    name: 'archiveMinio',
    group: ['transform'],
    version: 1,
    description: 'Archive a file on minio',
    defaults: {
      name: 'Archive file',
      color: '#772244',
    },
    credentials: [{
      name: "minio",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      // Node properties which the user gets displayed and
      // can change on the node.
      {
        displayName: 'File Name',
        name: 'filename',
        type: 'string',
        default: '',
        placeholder: 'name',
        description: 'The name of the file to archive',
        required: true
      },
      {
        displayName: 'Bucket',
        name: 'bucket',
        type: 'string',
        default: '',
        placeholder: 'name',
        description: 'The name of the minio bucket',
        required: true
      },
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const filename = this.getNodeParameter('filename', 0) as string;
    const bucket = this.getNodeParameter('bucket', 0) as string;

    const client = createMinioClient(this);

    await archiveFile(client, bucket, filename);

    return [this.helpers.returnJsonArray({})];
  }
}
