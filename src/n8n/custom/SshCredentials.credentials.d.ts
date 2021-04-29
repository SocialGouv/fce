import { ICredentialType, NodePropertyTypes } from "n8n-workflow";
export declare class SshCredentials implements ICredentialType {
    name: string;
    displayName: string;
    properties: {
        displayName: string;
        name: string;
        type: NodePropertyTypes;
        default: string;
    }[];
}
