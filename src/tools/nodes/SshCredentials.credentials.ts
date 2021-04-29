import { ICredentialType, NodePropertyTypes } from "n8n-workflow";

export class SshCredentials implements ICredentialType {
  name = "SshCredentials";
  displayName = "SSH Credentials";
  properties = [
    {
      displayName: "Username preproduction",
      name: "username-preproduction",
      type: "string" as NodePropertyTypes,
      default: ""
    },
    {
      displayName: "Host preproduction",
      name: "host-preproduction",
      type: "string" as NodePropertyTypes,
      default: ""
    },
    {
      displayName: "Username production",
      name: "username-production",
      type: "string" as NodePropertyTypes,
      default: ""
    },
    {
      displayName: "Host production",
      name: "host-production",
      type: "string" as NodePropertyTypes,
      default: ""
    }
  ];
}
