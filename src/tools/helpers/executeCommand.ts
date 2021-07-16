import { exec } from "child_process";

import IExecReturnData from "../interfaces/IExectReturnData";

export default (command: string): Promise<IExecReturnData> => {
  const returnData: IExecReturnData = {
    exitCode: 0,
    stderr: "",
    stdout: ""
  };

  return new Promise((resolve, reject) => {
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
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
