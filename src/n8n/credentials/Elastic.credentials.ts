import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class Elastic implements ICredentialType {
	name = 'elasticsearch';
	displayName = 'Elastic Search Api Key';
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
      displayName: 'ApiKey',
      name: 'apiKey',
      type: 'string' as NodePropertyTypes,
      default: '',
    },
	];
}
