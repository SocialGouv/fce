"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestSourceFile = void 0;
const executeHelpers_1 = require("../helpers/executeHelpers");
const executeDockerRemoteCommand_1 = require("../helpers/executeDockerRemoteCommand");
const extractInputData_1 = require("../helpers/extractInputData");
const prepareErrorResponse_1 = require("../helpers/prepareErrorResponse");
const prepareSuccessResponse_1 = require("../helpers/prepareSuccessResponse");
const isSuccess_1 = require("../helpers/isSuccess");
class IngestSourceFile {
    constructor() {
        this.description = {
            displayName: "Ingest Source File",
            name: "IngestSourceFile",
            group: ["transform"],
            version: 1,
            description: "Ingest a source file",
            defaults: {
                name: "Ingest Source File",
                color: "#e69232",
            },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: "SshCredentials",
                    required: true,
                },
            ],
            properties: [],
        };
    }
    async execute() {
        const inputData = extractInputData_1.default(this.getInputData());
        const requiredInputData = ["source_id", "env"];
        if (!executeHelpers_1.validateInputData(inputData, requiredInputData)) {
            return this.prepareOutputData(prepareErrorResponse_1.default(`inputData is missing in [${requiredInputData.join(", ")}]`));
        }
        const { env, source_id } = inputData;
        const { username, host } = executeHelpers_1.getCredentialsByEnv(this.getCredentials("SshCredentials"), env);
        if (!username || !host) {
            return this.prepareOutputData(prepareErrorResponse_1.default("Unknown remote"));
        }
        const { exitCode, stdout, stderr } = await executeDockerRemoteCommand_1.default(`NODE_ENV=production node ./shell/run.js IngestFile --id ${source_id}`, {
            container: "server",
            bash: "ash",
        }, {
            host: host,
            username: username,
        });
        if (!isSuccess_1.default(exitCode)) {
            return this.prepareOutputData(prepareErrorResponse_1.default(`Command failed ! ${stderr}`, { stdout }));
        }
        return this.prepareOutputData(prepareSuccessResponse_1.default(`Success ! ${stdout}`, { stderr, source_id, env }));
    }
}
exports.IngestSourceFile = IngestSourceFile;
//# sourceMappingURL=IngestSourceFile.node.js.map