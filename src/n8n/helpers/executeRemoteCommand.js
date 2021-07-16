"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const executeCommand_1 = require("./executeCommand");
exports.default = (command, sshConfig) => {
    const distBaseCommand = `ssh -T ${sshConfig.username}@${sshConfig.host}`;
    const fullcommand = `${distBaseCommand} '${command}'`;
    return executeCommand_1.default(fullcommand);
};
//# sourceMappingURL=executeRemoteCommand.js.map