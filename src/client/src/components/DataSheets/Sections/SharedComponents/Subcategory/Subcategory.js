import React from "react";
import PropTypes from "prop-types";
import Data from "../Data";
import Source from "../../../../../containers/Source";

import "./subcategory.scss";

const Subcategory = ({
  subtitle,
  datas = [],
  children,
  sourceSi = null,
  sourceCustom = null,
  sourceDate = null
}) => {
  return (
    <div className="subcategory">
      <div className="subcategory__header">
        <h3 className="subcategory__title">{subtitle}</h3>
        {(sourceCustom || sourceSi) && (
          <Source
            si={sourceSi}
            sourceDate={sourceDate}
            sourceCustom={sourceCustom}
          />
        )}
      </div>
      {children
        ? children
        : datas.map(data => {
            return (
              <Data
                key={data.name}
                name={data.name}
                value={data.value}
                emptyValue={data.emptyValue || "-"}
                nonEmptyValue={data.nonEmptyValue}
                link={data.link}
                columnClasses={data.columnClasses}
                sourceSi={data.sourceSi}
                sourceCustom={data.sourceCustom}
                sourceDate={data.sourceDate}
              />
            );
          })}
    </div>
  );
};

Subcategory.propTypes = {
  subtitle: PropTypes.string.isRequired,
  sourceSi: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
  datas: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
};

export default Subcategory;
