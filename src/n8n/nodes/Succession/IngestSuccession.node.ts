import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { ingestDb, IngestDbConfig } from "../../utils/ingestDb";

const fields = [
    "siretEtablissementPredecesseur",
    "siretEtablissementSuccesseur",
    "dateLienSuccession",
    "transfertSiege",
    "continuiteEconomique",
    "dateDernierTraitementLienSuccession"
];

const getConfig = (fileName: string): IngestDbConfig => ({
    fieldsMapping: fields.reduce((acc, value) => {
        acc[value] = value.toLowerCase();
        return acc;
    }, {} as Record<string, string>),
    filename: fileName,
    table: "etablissements_successions",
    truncate: true,
    separator: ",",
    bypassConflictSafeInsert: true,
    sanitizeHtmlChars: false
});

export class IngestSuccession implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Succession Ingest",
        name: "successionIngest",
        group: ['transform'],
        version: 1,
        description: "Ingest Sucession data",
        defaults: {
            name: 'Ingest Sucession',
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
                default: 'StockEtablissementLiensSuccession_utf8/StockEtablissementLiensSuccession_utf8.csv',
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
