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
          backgroundColor: "#2980b9",
          borderColor: "#2980b9",
          borderWidth: 3,
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
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },

    responsive: true,

    scales: {
      x: {
        border: { display: false },
      },
      y: {
        border: { display: false },
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
