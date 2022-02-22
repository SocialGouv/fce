import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { createMinioClient } from "../../clients/minio";
import {uploadFile} from "../../utils/minio";
import {format} from "date-fns";
import path from "path";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";

export class MinioUpload implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Minio Upload',
    name: 'minioUpload',
    group: ['transform'],
    version: 1,
    description: 'Upload a file to minio',
    defaults: {
      name: 'Upload',
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
        displayName: 'Input file name',
        name: 'inputName',
        type: 'string',
        default: '',
        placeholder: 'Input name',
        description: 'The name of the input file',
      },
      {
        displayName: 'Bucket Name',
        name: 'bucket',
        type: 'string',
        default: '',
        placeholder: 'Bucket',
        description: 'The fetched bucket',
        required: true
      },
      {
        displayName: 'Output file path',
        name: 'outputPath',
        type: 'string',
        default: '',
        placeholder: 'Output path',
        description: 'The path of the output file',
      },
      {
        displayName: 'Output file name',
        name: 'outputName',
        type: 'string',
        default: '',
        placeholder: 'Output name',
        description: 'The name of the output file',
      },
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const inputName = this.getNodeParameter('inputName', 0) as string;
    const bucket = this.getNodeParameter('bucket', 0) as string;
    const outputPath = this.getNodeParameter('outputPath', 0) as string;
    const outputName = this.getNodeParameter('outputName', 0) as string;

    const client = await createMinioClient(this);

    const date = format(new Date(),"yyyy-MM-dd_hh-mm");

    await uploadFile(client, bucket, path.join(DOWNLOAD_STORAGE_PATH, inputName), path.join(outputPath, `${date}_${outputName}`));

    return [this.helpers.returnJsonArray({})];
  }
}
