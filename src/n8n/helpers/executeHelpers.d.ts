import { ICredentialDataDecryptedObject } from "n8n-workflow";
import IExecReturnDataSources from "../interfaces/IExecReturnDataSources";
import IExectReturnData from "../interfaces/IExectReturnData";
export declare const validateInputData: (inputData: IExectReturnData | IExecReturnDataSources, requiredInputKeys: string[]) => boolean;
export declare const getCredentialsByEnv: (credentials?: ICredentialDataDecryptedObject | undefined, env?: string | undefined) => {
    username: string | number | boolean | import("n8n-workflow").IDataObject | undefined;
    host: string | number | boolean | import("n8n-workflow").IDataObject | undefined;
};
