import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Data from "../Data";
import Source from "../../../../../containers/Source";

import "./subcategory.scss";

const Subcategory = ({
  subtitle = null,
  datas = [],
  children,
  sourceSi = null,
  sourceCustom = null,
  sourceDate = null,
  className = ""
}) => {
  return (
    <div className={classNames("subcategory", className)}>
      {subtitle && (
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
      )}
      {children}
      {datas &&
        datas.map(data => {
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
              hasNumberFormat={data.hasNumberFormat}
              numberFormatOptions={data.numberFormatOptions}
            />
          );
        })}
    </div>
  );
};

Subcategory.propTypes = {
  subtitle: PropTypes.string,
  sourceSi: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
  datas: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  className: PropTypes.string
};

export default Subcategory;
