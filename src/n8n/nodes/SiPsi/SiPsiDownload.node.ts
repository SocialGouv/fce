import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { downloadOldestFile, getFiles } from "../../utils/minio";
import { getSiPsiFileDate, SiPsiKey } from "../../utils/siPsi";
import { createMinioClient } from "../../clients/minio";

export class SiPsiDownload implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SI PSI Download',
    name: 'siPsiDownload',
    group: ['transform'],
    version: 1,
    description: 'Download SiPsi from minio',
    defaults: {
      name: 'Download SiPsi',
      color: '#772244',
    },
    credentials: [{
      name: "minio",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [{
      displayName: 'Import Type',
      name: 'importType',
      type: 'options',
      options: [
        {
          name: 'Siret',
          value: "siret",
        },
        {
          name: 'Siren',
          value: "siren",
        },
      ],
      default: 'siren',
      description: 'The imported file type',
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const key = this.getNodeParameter("importType", 0) as SiPsiKey;

    const bucket = "dgt";
    const downloadRegex = new RegExp(`^ClientsPSI-${key}-([0-9]*)-([0-9]*)\\.csv$`, "i");

    const client = await createMinioClient(this);
    const { remoteFile: remoteFile1 } = await downloadOldestFile(client, bucket, downloadRegex);

    const matchingFiles = await getFiles(client, bucket, downloadRegex);

    const otherYearFile = matchingFiles
      .map(({ name }) => name)
      .filter(filename => filename !== remoteFile1)[0];

    const otherYearFileRegex = new RegExp(`^${otherYearFile}$`, "i");
    const { remoteFile: remoteFile2 } = await downloadOldestFile(client, bucket, otherYearFileRegex);

    const date = getSiPsiFileDate(remoteFile1);

    return [
      this.helpers.returnJsonArray({
        files: JSON.stringify([remoteFile1, remoteFile2]),
        updateDate: date
      })
    ];
  }
}
