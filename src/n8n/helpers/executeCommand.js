"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.default = (command) => {
    const returnData = {
        exitCode: 0,
        stderr: "",
        stdout: ""
    };
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
            returnData.stdout = stdout.trim();
            returnData.stderr = stderr.trim();
            if (error) {
                returnData.error = error;
            }
            resolve(returnData);
        }).on("exit", code => {
            returnData.exitCode = code || 0;
        });
    });
};
//# sourceMappingURL=executeCommand.js.map