"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReindexAppsearch = void 0;
const child_process_1 = require("child_process");
function execPromise(command) {
    const returnData = {
        exitCode: 0,
        stderr: "",
        stdout: "",
    };
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
            returnData.stdout = stdout.trim();
            returnData.stderr = stderr.trim();
            if (error) {
                returnData.error = error;
            }
            resolve(returnData);
        }).on("exit", (code) => {
            returnData.exitCode = code || 0;
        });
    });
}
class ReindexAppsearch {
    constructor() {
        this.description = {
            displayName: "Reindex Appsearch",
            name: "reindexAppsearch",
            group: ["transform"],
            version: 1,
            description: "Reindex Appsearch data from fce",
            defaults: {
                name: "Reindex Appsearch",
                color: "#772244",
            },
            inputs: ["main"],
            outputs: ["main"],
            properties: [
                {
                    displayName: "Host",
                    name: "host",
                    type: "string",
                    default: "",
                    placeholder: "53.x.x.x",
                    description: "Remote server ip",
                },
                {
                    displayName: "User name",
                    name: "uname",
                    type: "string",
                    default: "",
                    placeholder: "factory",
                    description: "Remote server user",
                },
            ],
        };
    }
    async execute() {
        const host = this.getNodeParameter("host", 0, "");
        const uname = this.getNodeParameter("uname", 0, "");
        const distBaseCommand = `ssh -T ${uname}@${host}`;
        const nodeEnv = `NODE_ENV=production`;
        const dcExecServer = `exec server ash -c`;
        const returnItems = [];
        const { exitCode, stdout, stderr, } = await execPromise(`${distBaseCommand} 'bash -s' <<'CMD'
docker ${dcExecServer} "${nodeEnv} node ./scripts/appsearchIndexer.js"
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
exports.ReindexAppsearch = ReindexAppsearch;
//# sourceMappingURL=ReindexAppsearch.node.js.map