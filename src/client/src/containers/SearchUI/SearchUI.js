import React, { useState, useEffect } from "react";
import Http from "../../services/Http";
import SearchUIView from "../../components/SearchUI";
import divisionsNaf from "./divisions-naf.json";

const SearchUI = () => {
  const [departements, setDepartements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await Http.get("/departements");
        setDepartements(res.data.results);
        setIsSuccess(true);
      } catch (e) {
        setError(e);
        isSuccess(false);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    console.log(departements) || (
      <SearchUIView
        divisionsNaf={divisionsNaf}
        departements={{ data: departements, isLoading, isSuccess, error }}
      />
    )
  );
};

export default SearchUI;
