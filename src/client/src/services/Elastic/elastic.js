import { useCallback, useState } from "react";

import Http from "../Http";

const defaultData = {
  results: null,
  total: 0,
};

export const queryElastic = (query, { page: { size, current }, params }) =>
  Http.get("/elastic", {
    params: {
      from: current * size,
      q: query,
      size,
      ...params,
    },
  });

export const useElasticQuery = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const makeQuery = useCallback(
    (query, { page: { size, current }, params }) => {
      const sentQuery = query?.trim();
      setIsLoading(true);
      setError(null);

      queryElastic(sentQuery, { page: { current, size }, params })
        .then((response) => {
          setData({
            results: response.data.results,
            total: response.data.total.value,
          });
          setQuery(sentQuery);
        })
        .catch((err) => {
          setData(defaultData);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setData, setIsLoading, setError]
  );

  return {
    data,
    error,
    loading,
    makeQuery,
    query,
  };
};
