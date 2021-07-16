import { ICredentialDataDecryptedObject } from "n8n-workflow";

import IExecReturnDataSources from "../interfaces/IExecReturnDataSources";
import IExectReturnData from "../interfaces/IExectReturnData";

export const validateInputData = (
  inputData: IExectReturnData | IExecReturnDataSources,
  requiredInputKeys: string[]
) => {
  for (const inputKey of requiredInputKeys) {
    if (!inputData.hasOwnProperty(inputKey)) {
      return false;
    }
  }

  return true;
};

export const getCredentialsByEnv = (
  credentials?: ICredentialDataDecryptedObject,
  env?: string
) => ({
  username: credentials?.[`username-${env}`],
  host: credentials?.[`host-${env}`],
});
