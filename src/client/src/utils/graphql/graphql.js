import { prop } from "lodash/fp";

export const mapQueryResult =
  (mapper) =>
  ({ loading, data, error }) =>
    loading || error
      ? { data, error, loading }
      : { data: mapper(data), error, loading };

export const getAggregateCount = prop("aggregate.count");
