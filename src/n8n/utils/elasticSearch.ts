import {Client} from "@elastic/elasticsearch";

export const getIndexLastUpdateTime = async (client: Client, index: string) => {
  try {
    const cat = await client.cat.indices({
      index,
      format: "json",
      h: "creation.date"
    });

    return cat?.[0]?.["creation.date"] ? +cat?.[0]?.["creation.date"] : null;
    // tslint:disable-next-line:no-any
  } catch(err: any) {
    if (err?.meta?.body?.error?.type) {
      return 0;
    }

    throw err;
  }
};
