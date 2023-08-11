import "../../Establishment/Activity/effectifEtp.scss";

import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { setYearMonthFormat } from "../../../../../helpers/Date";
import LineChart from "../../../../Charts/LineChart";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";

const EffectifGraph = ({ chartData }) => {
  const dataChart = useMemo(() => {
    return {
      datasets: [
        {
          backgroundColor: "#000091",
          borderColor: "#000091",
          borderWidth: 2,
          data: chartData?.map((obj) =>
            obj?.effectif !== 0 ? obj?.effectif : null
          ),
          label: "Effectif ETP",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          tension: 0.3,
        },
      ],
      labels: chartData?.map((obj) =>
        obj?.effectif !== 0 ? setYearMonthFormat(obj?.periode_concerne) : null
      ),
    };
  }, [chartData]);

  const options = {
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        color: "#0063CB",
        display: true,
        font: {
          family: "Marianne, sans-serif",
          size: 14,

          weight: 700,
        },
        padding: {
          bottom: 30,
          top: 5,
        },
        text: "Effectif ETP",
      },
    },

    responsive: true,

    scales: {
      x: {
        border: { display: false },
        grid: {
          borderColor: "white",
          color: "white",
        },
        ticks: { color: "#7C8DB5 " },
      },

      y: {
        border: { display: false },
        grid: {
          borderColor: "#E6EDFF",
          color: "#E6EDFF",
        },
        ticks: { color: "#7C8DB5" },
      },
    },
  };

  return (
    <>
      <LoadableContent>
        <>
          {chartData?.length > 0 ? (
            <LoadableContent>
              <div className="chart-wrapper">
                <LineChart options={options} data={dataChart} />
              </div>
            </LoadableContent>
          ) : (
            <div>Données non disponibles.</div>
          )}
        </>
      </LoadableContent>
    </>
  );
};

EffectifGraph.propTypes = {
  chartData: PropTypes.any.isRequired,
};

export default EffectifGraph;
