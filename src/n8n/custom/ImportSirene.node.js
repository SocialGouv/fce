"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportSirene = void 0;
const child_process_1 = require("child_process");
function execPromise(command) {
    const returnData = {
        exitCode: 0,
        stderr: '',
        stdout: '',
    };
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
            returnData.stdout = stdout.trim();
            returnData.stderr = stderr.trim();
            if (error) {
                returnData.error = error;
            }
            resolve(returnData);
        }).on('exit', code => { returnData.exitCode = code || 0; });
    });
}
class ImportSirene {
    constructor() {
        this.description = {
            displayName: 'Import Sirene',
            name: 'importSirene',
            group: ['transform'],
            version: 1,
            description: 'Process sirene import on production database to update enterprises data',
            defaults: {
                name: 'Import Sirene',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Host',
                    name: 'host',
                    type: 'string',
                    default: '',
                    placeholder: '53.x.x.x',
                    description: 'Remote server ip',
                },
                {
                    displayName: 'User name',
                    name: 'uname',
                    type: 'string',
                    default: '',
                    placeholder: 'factory',
                    description: 'Remote server user',
                }
            ]
        };
    }
    async execute() {
        const host = this.getNodeParameter('host', 0, '');
        const uname = this.getNodeParameter('uname', 0, '');
        const distBaseCommand = `ssh -T ${uname}@${host}`;
        const nodeEnv = `NODE_ENV=production`;
        const dcExecServer = `exec server ash -c`;
        const baseSirenePathFiles = "/tmp/data/";
        const enterprisesFileName = `StockUniteLegale_utf8.zip`;
        const establishmentsFileName = `StockEtablissement_utf8.zip`;
        const successionFileName = `StockEtablissementLiensSuccession_utf8.zip`;
        const returnItems = [];
        const { exitCode, stdout, stderr, } = await execPromise(`${distBaseCommand} 'bash -s' <<'CMD'
docker ${dcExecServer} "${nodeEnv} node ./shell/run.js ImportSirene --enterprises_filename ${baseSirenePathFiles 
        + enterprisesFileName} --establishments_filename ${baseSirenePathFiles 
        + establishmentsFileName} --establishments_successions_filename ${baseSirenePathFiles 
        + successionFileName}"
CMD`);
        returnItems.push({
            json: {
                exitCode,
                stderr,
                stdout,
            },
        });
        return this.prepareOutputData(returnItems);
    }
}
exports.ImportSirene = ImportSirene;
//# sourceMappingURL=ImportSirene.node.js.map