import React from "react";
import PropTypes from "prop-types";
import Data from "../Data";
import Source from "../../../../../containers/Source";

import "./subcategory.scss";

const Subcategory = ({ subtitle, datas, children, sectionSource }) => {
  return (
    <div className="subcategory">
      <div className="subcategory__header">
        <h3 className="subcategory__title">{subtitle}</h3>
        {sectionSource && <Source si={sectionSource} />}
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
                source={data.source}
              />
            );
          })}
    </div>
  );
};

Subcategory.propTypes = {
  subtitle: PropTypes.string.isRequired,
  source: PropTypes.string,
  datas: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
};

export default Subcategory;
