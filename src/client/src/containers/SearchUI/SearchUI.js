import React from "react";
import Http from "../../services/Http";
import SearchUIView from "../../components/SearchUI";
import divisionsNaf from "./divisions-naf.json";
import Config from "../../services/Config";

const SearchUI = () => {
  const loadLocations = term => {
    const minTermLength = Config.get("advancedSearch").minTerms;
    const debounceTime = Config.get("advancedSearch").debounce;

    let loadLocationsTimer;
    clearTimeout(loadLocationsTimer);

    if (term.length < minTermLength) {
      return new Promise(resolve => {
        resolve([]);
      });
    }

    const communesPromise = Http.get("/communes", {
      params: {
        q: term
      }
    })
      .then(response => {
        if (response.data && response.data.results) {
          return response.data.results.map(commune => {
            return {
              label: `${commune.nom} (${commune.code_postal
                .trim()
                .padStart(5, "0")})`,
              value: commune.code_insee.trim().padStart(5, "0")
            };
          });
        }
        return [];
      })
      .catch(function(error) {
        console.error(error);
        return [];
      });

    const departementsPromise = Http.get("/departements", {
      params: {
        q: term
      }
    })
      .then(response => {
        if (response.data && response.data.results) {
          return response.data.results.map(departement => {
            return {
              label: `${departement.nom.toUpperCase()} (${departement.code})`,
              value: departement.code
            };
          });
        }
        return [];
      })
      .catch(function(error) {
        console.error(error);
        return [];
      });

    return new Promise(resolve => {
      return (loadLocationsTimer = setTimeout(() => {
        return Promise.all([communesPromise, departementsPromise]).then(
          result =>
            resolve([
              { label: "Départements", options: result[1] },
              { label: "Communes", options: result[0] }
            ])
        );
      }, debounceTime));
    });
  };

  return (
    <SearchUIView divisionsNaf={divisionsNaf} loadLocations={loadLocations} />
  );
};

export default SearchUI;
