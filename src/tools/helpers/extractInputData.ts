import { INodeExecutionData } from "n8n-workflow";

import IExecReturnData from "../interfaces/IExectReturnData";

export default (inputData: INodeExecutionData[]): IExecReturnData => {
  const jsonData = inputData?.[0]?.json || {};
  const { exitCode, stderr, stdout, ...rest } = jsonData;

  return {
    exitCode: exitCode ? +exitCode : 0,
    stderr: stderr ? stderr.toString() : "",
    stdout: stdout ? stdout.toString() : "",
    ...rest,
  };
};
