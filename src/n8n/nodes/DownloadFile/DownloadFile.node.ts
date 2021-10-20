import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import fs from "fs";
import https from "https";
import path from "path";
import { DOWNLOAD_STORAGE_PATH } from "../../utils/constants";


export class DownloadFile implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Download File",
        name: "downloadFile",
        group: ['transform'],
        version: 1,
        description: "Download a file from an URL",
        defaults: {
            name: 'Download File',
            color: '#772244',
        },
        properties: [
            // Node properties which the user gets displayed and
            // can change on the node.
            {
                displayName: 'Download url',
                name: 'downloadUrl',
                type: 'string',
                default: '',
                placeholder: 'Download URL',
                description: 'A URL from which the file is downloaded',
                required: true
            },
            {
                displayName: 'Output file name',
                name: 'fileName',
                type: 'string',
                default: '',
                placeholder: 'file name',
                description: 'The target name of the downloaded file',
                required: true
            },
        ],
        credentials: [],
        inputs: ['main'],
        outputs: ['main'],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const url = this.getNodeParameter("downloadUrl", 0) as string;
        const filename = this.getNodeParameter("fileName", 0) as string;

        try {
            fs.mkdirSync(DOWNLOAD_STORAGE_PATH)
        } catch (e) {
        }

        const outputPath = path.join(DOWNLOAD_STORAGE_PATH, filename);

        const outputStream = fs.createWriteStream(outputPath);

        await new Promise(async (resolve, reject) => {
            const request = https.get(url, (response) =>
                response.pipe(outputStream)
            );

            request.on("error", reject);

            outputStream.on("finish", resolve);
        });

        return [
            this.helpers.returnJsonArray({})
        ];
    }
}
