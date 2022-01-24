# N8N FCE

## Development


### Basics

Install dependencies

```
yarn
```

Setup custom extensions by adding `N8N_CUSTOM_EXTENSIONS="/asolute/path/to/dist/folder"`

Import project workflows

```
yarn n8n:import
```

Start build

```
yarn dev
```

Start n8n front

```
yarn n8n
```

### Exporting workflows

```
yarn n8n:export
```


### Creating nodes

Create a file in the `nodes` folder with the name pattern `*.node.ts`;

The exported class must be named after the file.

Example:

```typescript
// IngestAccords.node.ts
export class IngestAccords implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Accords Ingest",
    name: "accordsIngest",
    group: ['transform'],
    version: 1,
    description: "Ingest accords d'entreprise",
    defaults: {
      name: 'Accords Ingest',
      color: '#772244',
    },
    credentials: [{
      name: "postgres",
      required: true
    }],
    inputs: ['main'],
    outputs: ['main'],
    properties: []
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return ingestDb(this, config);
  }
}
```
