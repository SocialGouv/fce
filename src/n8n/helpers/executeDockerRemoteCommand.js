"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const executeRemoteCommand_1 = require("./executeRemoteCommand");
exports.default = (command, dockerExecConfig, sshConfig) => {
    const dockerExecCmd = `exec ${dockerExecConfig.container} ${dockerExecConfig.bash} -c`;
    const fullcommand = `docker ${dockerExecCmd} "${command}"`;
    return executeRemoteCommand_1.default(fullcommand, sshConfig);
};
//# sourceMappingURL=executeDockerRemoteCommand.js.map