import React from "react";
import PropTypes from "prop-types";

const CheckboxFilter = ({ filters, addFilter, removeFilter, id, label }) => {
    return (
        <div className="field filter__siege">
            <input
                className="is-checkradio is-light"
                type="checkbox"
                name={id}
                id={id}
                onChange={() => {
                    filters[id] ? removeFilter(id) : addFilter(id, "true");
                }}
                checked={!!filters[id]}
            />
            <label className="label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

CheckboxFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default CheckboxFilter;
