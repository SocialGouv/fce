import PropTypes from "prop-types";
import React from "react";
import { Line } from "react-chartjs-2";

import { setYearMonthFormat } from "../../../../../../helpers/Date";
import {
  formatChiffre,
  sortedDataAsc,
} from "../../../../../../utils/donnees-ecofi/donnees-ecofi";

function FinancesGraph({ data }) {
  const chartData = {
    datasets: [
      {
        backgroundColor: "#3498DB",
        borderColor: "#3498DB",
        borderWidth: 3,

        data: sortedDataAsc(data)?.map(({ EBE }) => EBE),
        fill: false,
        label: "EBITDA-EBE (€)",

        pointBackgroundColor: "white",
        pointBorderWidth: 1,
      },
      {
        backgroundColor: "#D98880",
        borderColor: "#D98880",
        borderWidth: 3,

        data: sortedDataAsc(data)?.map(({ ca }) => ca),

        label: "Chiffre d'affaires (€)",

        pointBackgroundColor: "white",
        pointBorderWidth: 1,
      },
      {
        backgroundColor: "#2ECC71",
        borderColor: "#2ECC71",
        borderWidth: 3,

        data: sortedDataAsc(data)?.map(({ EBIT }) => EBIT),

        label: "Résultat d'exploitation (€)",

        pointBackgroundColor: "white",
        pointBorderWidth: 1,
      },
      {
        backgroundColor: "#B71C1C",
        borderColor: "#B71C1C",
        borderWidth: 3,

        data: sortedDataAsc(data)?.map(({ Resultat_net }) => Resultat_net),

        label: "Résultat net (€)",

        pointBackgroundColor: "white",
        pointBorderWidth: 1,
      },
      {
        backgroundColor: "#34495E",
        borderColor: "#34495E",
        borderWidth: 3,

        data: sortedDataAsc(data)?.map(({ Marge_brute }) => Marge_brute),

        label: "Marge brute (€)",

        pointBackgroundColor: "white",
        pointBorderWidth: 1,
      },
    ],
    labels: sortedDataAsc(data)?.map(({ date_fin_exercice }) =>
      setYearMonthFormat(date_fin_exercice)
    ),
  };
  const options = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Données financières",
      },
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            const label = tooltipItem.dataset.label || "";
            return (
              label +
              " " +
              formatChiffre(tooltipItem.parsed.y.toString()).toString()
            );
          },
          labelColor: function (tooltipItem) {
            console.log(tooltipItem);
            return {
              backgroundColor: tooltipItem.dataset.backgroundColor,
              borderRadius: 2,
              borderWidth: 2,
            };
          },
        },
      },
    },

    position: "custom",
    responsive: true,
    scales: {
      x: {
        border: { display: false },
      },

      y: {
        border: { display: true },

        ticks: {
          callback: (label) => {
            return formatChiffre(label.toString());
          },
        },
      },
    },
  };
  return (
    <div className="chart-wrapper">
      {data?.length > 0 && <Line options={options} data={chartData} />}
    </div>
  );
}

FinancesGraph.propTypes = {
  data: PropTypes.array,
};

export default FinancesGraph;
