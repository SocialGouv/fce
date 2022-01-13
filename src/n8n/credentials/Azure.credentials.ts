import {
  ICredentialType,
  NodePropertyTypes,
} from 'n8n-workflow';


export class Azure implements ICredentialType {
  name = 'azure';
  displayName = 'Azure storage Credentials';
  properties = [
    {
      displayName: 'Connection string',
      name: 'connectionString',
      type: 'string' as NodePropertyTypes,
      default: '={{ $env.AZURE_CONNECTION_STRING }}',
    },
    {
      displayName: 'Share name',
      name: 'shareName',
      type: 'string' as NodePropertyTypes,
      default: '={{ $env.AZURE_SHARE_NAME }}',
    },
  ];
}
