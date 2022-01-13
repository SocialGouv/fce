import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const fieldsMapping = {
    "siren": "siren",
    "year": "annee",
    "index": "index",
};

const getConfig = (fileName: string): IngestDbConfig => ({
    fieldsMapping,
    filename: fileName,
    table: "egapro_index",
    truncate: true,
    separator: ";",
    nonEmptyFields: ["siren", "annee"],
    deduplicateField: ["siren", "annee"],
    padSiren: true,
    sanitizeHtmlChars: false,
    updateHistoryQuery: `UPDATE import_updates SET date = CURRENT_TIMESTAMP,
                        date_import = CURRENT_TIMESTAMP WHERE "table" = 'egapro_index';`
});

export class EgaproIngest implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Egapro Ingest",
        name: "egaproIngest",
        group: ['transform'],
        version: 1,
        description: "Ingest Egapro data",
        defaults: {
            name: 'Ingest Egapro',
            color: '#772244',
        },
        credentials: [{
            name: "postgres",
            required: true
        }],
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'File name',
                name: 'fileName',
                type: 'string',
                default: 'egapro.csv',
                placeholder: 'File name',
                description: 'The name of the csv file to ingest',
                required: true
            },
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;

        const config = getConfig(fileName);

        return ingestDb(this, config);
    }
}
