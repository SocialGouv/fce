"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupPostgres = void 0;
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
class BackupPostgres {
    constructor() {
        this.description = {
            displayName: 'Backup Postgres',
            name: 'backupPostgres',
            group: ['transform'],
            version: 1,
            description: 'Backup fce postgres database',
            defaults: {
                name: 'Backup Postgres',
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
        const dcExecDb = `docker exec db bash -c`;
        const dbUser = `postgres`;
        const dbBase = `fce`;
        const pgDumpData = `pg_dump -c --if-exists --no-acl -O -U ${dbUser} ${dbBase}`;
        const grepToEscapte = `grep -v -E 'DROP\ SCHEMA\ IF\ EXISTS\ public|CREATE\ SCHEMA\ public|COMMENT\ ON\ SCHEMA\ public'"`;
        const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
        const outputFileName = `backup_${currentDate}.sql.gz`;
        const outputDir = `/mnt/data/backups/`;
        const returnItems = [];
        const { exitCode, stdout, stderr, } = await execPromise(`${distBaseCommand} 'bash -s' <<'CMD'
${dcExecDb} "${pgDumpData} | ${grepToEscapte} | gzip > ${outputDir}${outputFileName}
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
exports.BackupPostgres = BackupPostgres;
//# sourceMappingURL=BackupPostgres.node.js.map