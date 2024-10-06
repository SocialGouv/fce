import { useCallback, useEffect, useState } from "react";

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

export const useIsNotFound = (siret, siren) => {
  const { data, error, loading, makeQuery } = useElasticQuery();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Trigger the query whenever siret or siren changes
    if (siret || siren) {
      makeQuery(siret || siren, {
        page: { current: 0, size: 10 },
        params: null,
      });
    }
  }, [siren, siret, makeQuery]);

  useEffect(() => {
    // Set the isNotFound flag based on data, error, and loading
    if (!loading) {
      setIsNotFound(error || !data?.results || data?.results?.length === 0);
    }
  }, [loading, error, data]);

  return isNotFound;
};
