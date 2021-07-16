import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
export interface IExecReturnData {
    exitCode: number;
    error?: Error;
    stderr: string;
    stdout: string;
}
export declare class DownloadSireneFiles implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
