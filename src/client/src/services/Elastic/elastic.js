import { useEffect, useState } from "react";
import Http from "../Http";

const defaultData = {
  results: [],
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

export const useElasticQuery = (query, { page: { size, current }, params }) => {
  const trimmedQuery = query.trim();

  const [data, setData] = useState(defaultData);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (Object.keys(params).length === 0 && !trimmedQuery) {
      setData(defaultData);
      setIsLoading(false);
      return;
    }

    queryElastic(query, { page: { size, current }, params })
      .then(response => {
        console.log(response.data);
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
  }, [trimmedQuery, size, current, params, setData, setIsLoading, setError]);

  return {
    loading,
    data,
    error
  };
};
