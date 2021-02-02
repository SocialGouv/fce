import React, { useState, useEffect } from "react";
import _map from "lodash.map";

import {
  nbUsersReturningAverage,
  extractStats,
  getAverageRateTimeOnSite,
  sum
} from "../../../helpers/Matomo/Statistics";
import { getStartDateStatsParam } from "../../../helpers/Date";
import Http from "../../../services/Http";
import StatsFilters from "./StatsFilters";
import LoadSpinner from "../../../components/shared/LoadSpinner";
import Value from "../../../components/shared/Value";
import VisitsGraph from "./VisitsGraph";
import "./statistics.scss";

const Statistics = () => {
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [range, setRange] = useState({ label: "12 mois", value: "12" });

  useEffect(() => {
    const getStats = months => {
      setIsLoading(true);
      return Http.get(`/matomo/${months}/${getStartDateStatsParam(months)}`)
        .then(res => res.data)
        .catch(error => {
          console.error(error);
          setError(error);
        })
        .finally(() => setIsLoading(false));
    };

    getStats(range.value).then(res => {
      const nbUsersList = _map(extractStats(res), "nb_users");
      const nbUsersReturningList = _map(
        extractStats(res),
        "nb_users_returning"
      );

      setStats({
        nb_users: res?.users.length,
        nb_users_returning_average: nbUsersReturningAverage(
          nbUsersList,
          nbUsersReturningList
        ),
        nb_visits: sum(_map(extractStats(res), "nb_visits")),
        avg_time_on_site: getAverageRateTimeOnSite(
          _map(extractStats(res), "avg_time_on_site"),
          range.value
        ),
        nb_pageviews: sum(_map(extractStats(res), "nb_pageviews")),
        avg_satisfaction_rate: res?.avg_satisfaction_rate,
        graph_visits_data: _map(extractStats(res), (monthData, date) => {
          return { label: date, value: monthData.nb_visits };
        })
      });
    });
  }, [range]);

  const data = [
    { label: "Nombre d'utilisateurs", value: stats?.nb_users },
    {
      label: "Part des utilisateurs de retour sur le site",
      value: isNaN(stats?.nb_users_returning_average)
        ? "-"
        : stats?.nb_users_returning_average + "%"
    },
    {
      label: "Niveau de satisfaction des utilisateurs",
      value: (stats?.avg_satisfaction_rate || "-") + " / 10"
    },
    { label: "Nombre de visite sur le site", value: stats?.nb_visits },
    {
      label: "Durée moyenne d’une visite",
      value: stats?.avg_time_on_site + " min"
    },
    {
      label: "Nombre de pages consultées",
      value: stats?.nb_pageviews
    }
  ];

  return (
    <div className="page content">
      <h1>Statistiques</h1>
      <StatsFilters
        setRange={setRange}
        range={range}
        setStats={setStats}
        isLoading={isLoading}
      />
      {error && (
        <div className="error">
          Une erreur est survenue lors de la récupération des données Matomo
        </div>
      )}
      {isLoading ? (
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
      {stats?.graph_visits_data && (
        <VisitsGraph data={stats.graph_visits_data} />
      )}
    </div>
  );
};

export default Statistics;
