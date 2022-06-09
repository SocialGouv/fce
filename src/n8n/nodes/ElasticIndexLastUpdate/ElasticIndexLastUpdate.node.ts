import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import {createElasticClient} from "../../utils/elastic";
import {getIndexLastUpdateTime} from "../../utils/elasticSearch";
import {formatISO} from "date-fns";

export class ElasticIndexLastUpdate implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Elastic search last index update",
    name: "elasticSearchLastUpdate",
    group: ['transform'],
    version: 1,
    description: "Elastic search last index update",
    defaults: {
      name: 'Elastic search last index update',
      color: '#772244',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: []
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const client = createElasticClient({});
    const lastUpdateTimestamp = await getIndexLastUpdateTime(client, "fce-search");
    const lastUpdateDate = lastUpdateTimestamp ?
      formatISO(new Date(lastUpdateTimestamp)) :
      null;

    return [this.helpers.returnJsonArray({
      lastUpdateTimestamp,
      lastUpdateDate
    })];
  }
}
