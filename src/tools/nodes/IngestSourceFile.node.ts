import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import {
  validateInputData,
  getCredentialsByEnv,
} from "../helpers/executeHelpers";
import executeDockerRemoteCommand from "../helpers/executeDockerRemoteCommand";
import extractInputData from "../helpers/extractInputData";
import prepareErrorResponse from "../helpers/prepareErrorResponse";
import prepareSuccessResponse from "../helpers/prepareSuccessResponse";
import isSuccess from "../helpers/isSuccess";
import IExecReturnDataSources from "../interfaces/IExecReturnDataSources";

export class IngestSourceFile implements INodeType {
  description: INodeTypeDescription = {
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const inputData = extractInputData(
      this.getInputData()
    ) as IExecReturnDataSources;

    const requiredInputData = ["source_id", "env"];

    if (!validateInputData(inputData, requiredInputData)) {
      return this.prepareOutputData(
        prepareErrorResponse(
          `inputData is missing in [${requiredInputData.join(", ")}]`
        )
      );
    }

    const { env, source_id } = inputData;
    const { username, host } = getCredentialsByEnv(
      this.getCredentials("SshCredentials"),
      env
    );

    if (!username || !host) {
      return this.prepareOutputData(prepareErrorResponse("Unknown remote"));
    }

    const { exitCode, stdout, stderr } = await executeDockerRemoteCommand(
      `NODE_ENV=production node ./shell/run.js IngestFile --id ${source_id}`,
      {
        container: "server",
        bash: "ash",
      },
      {
        host: host as string,
        username: username as string,
      }
    );

    if (!isSuccess(exitCode)) {
      return this.prepareOutputData(
        prepareErrorResponse(`Command failed ! ${stderr}`, { stdout })
      );
    }

    return this.prepareOutputData(
      prepareSuccessResponse(`Success ! ${stdout}`, { stderr, source_id, env })
    );
  }
}
