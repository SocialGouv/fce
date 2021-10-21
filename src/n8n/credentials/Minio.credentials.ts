import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';


export class Minio implements ICredentialType {
	name = 'minio';
	displayName = 'Minio Credentials';
	properties = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Endpoint',
			name: 'endPoint',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
    {
      displayName: 'Port',
      name: 'port',
      type: 'number' as NodePropertyTypes,
      default: '',
    },
    {
      displayName: 'Use SSL',
      name: 'useSSL',
      type: 'boolean' as NodePropertyTypes,
      default: '',
    },
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
    {
      displayName: 'Secret Key',
      name: 'secretKey',
      type: 'string' as NodePropertyTypes,
      default: ''
    }
	];
}
