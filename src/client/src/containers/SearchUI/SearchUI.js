import React, { useState, useEffect } from "react";
import Http from "../../services/Http";
import SearchUIView from "../../components/SearchUI";
import divisionsNaf from "./divisions-naf.json";

const SearchUI = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await Http.get("/departements");
        setDepartments(res.data.results);
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
    <SearchUIView
      divisionsNaf={divisionsNaf}
      departments={{ data: departments, isLoading, isSuccess, error }}
    />
  );
};

export default SearchUI;
