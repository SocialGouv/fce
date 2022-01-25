import { useCallback, useEffect, useState } from "react";
import Http from "../Http";

const defaultData = {
  results: null,
  total: 0
};

export const queryElastic = (query, { page: { size, current }, params }) =>
  Http.get("/elastic", {
    params: {
      q: query,
      from: current * size,
      size,
      ...params
    }
  });

export const useElasticQuery = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeQuery = useCallback(
    (query, { page: { size, current }, params }) => {
      const sentQuery = query?.trim();
      setIsLoading(true);
      setError(null);

      queryElastic(sentQuery, { page: { size, current }, params })
        .then(response => {
          setData({
            results: response.data.results,
            total: response.data.total.value
          });
        })
        .catch(err => {
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
    loading,
    data,
    error,
    makeQuery
  };
};
