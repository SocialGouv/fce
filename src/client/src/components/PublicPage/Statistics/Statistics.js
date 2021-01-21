import React, { useState, useEffect } from "react";
import moment from "moment";

import Http from "../../../services/Http";
import StatsFilters from "./StatsFilters";
import LoadSpinner from "../../../components/shared/LoadSpinner";
import Value from "../../../components/shared/Value";
import "./statistics.scss";

const Statistics = () => {
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [range, setRange] = useState({ label: "jour", value: "day" });
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const getStats = (date, range) => {
      setIsLoading(true);
      return Http.get(`/matomo/${date}/${range}`)
        .then(res => res.data)
        .catch(error => {
          console.error(error);
          setError(error);
        })
        .finally(() => setIsLoading(false));
    };

    getStats(date, range.value).then(res => setStats(res));
  }, [date, range]);

  const usersReturningRate =
    stats &&
    parseFloat((100 * (stats.nb_users_returning / stats.nb_users)).toFixed(1));

  const data = [
    { label: "Nombre d'utilisateurs", value: stats?.nb_users },
    {
      label: "Part des utilisateurs de retour sur le site",
      value: isNaN(usersReturningRate) ? "-" : usersReturningRate + "%"
    },
    {
      label: "Niveau de satisfaction des utilisateurs",
      value: stats?.avg_satisfaction_rate + " / 10"
    },
    { label: "Nombre de visite sur le site", value: stats?.nb_visits },
    {
      label: "Durée moyenne d’une visite",
      value: stats?.avg_time_on_site ? stats.avg_time_on_site + "s" : "-"
    },
    {
      label: "Nombre de pages consultées",
      value: stats?.nb_pageviews
    }
  ];

  return (
    <div className="page content">
      <h1>Statistiques Matomo</h1>
      <StatsFilters
        setRange={setRange}
        range={range}
        setDate={setDate}
        date={date}
        setStats={setStats}
      />
      {error ? (
        <div className="error">
          Une erreur est survenue, les données Matomo ne peuvent pas être
          récupérées
        </div>
      ) : isLoading ? (
        <LoadSpinner />
      ) : (
        <div className="stats">
          <div className="stats-items">
            {data.map(data => (
              <div key={data.label} className="stats-item">
                <h3 className="stats-item-label">{data.label}</h3>
                <div className="stats-item-value">
                  <Value value={data.value} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
