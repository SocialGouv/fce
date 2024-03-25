import "../App/app.scss";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, options = {}, chartCanvasRef = null }) {
  if (!data) return null;
  return (
    <div className="chart-graph">
      {data && <Line options={options} data={data} ref={chartCanvasRef} />}
    </div>
  );
}

LineChart.propTypes = {
  chartCanvasRef: PropTypes.any,
  data: PropTypes.array,
  options: PropTypes.array,
};

export default LineChart;
