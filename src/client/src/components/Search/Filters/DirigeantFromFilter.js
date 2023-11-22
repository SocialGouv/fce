import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const DirigeantFromFilter = ({
  removeFilter,
  addFilter,
  id,
  filters,
  onToggleMenu,
}) => {
  const [dirigeant, setDirigeant] = useState({
    dmax: "",
    dmin: "",
    nom: filters?.dirigeant?.nom,
    prenom: filters?.dirigeant?.prenom,
  });
  useEffect(() => {
    setDirigeant({
      nom: filters?.dirigeant?.nom,
      prenom: filters?.dirigeant?.prenom,
    });
  }, [filters]);
  const submitDirigeant = (e) => {
    e.preventDefault();
    addFilter(id, dirigeant);
    onToggleMenu(e);
  };

  const reset = (e) => {
    e.preventDefault();
    setDirigeant({ dmax: "", dmin: "", nom: "", prenom: "" });
    removeFilter(id);
    onToggleMenu(e);
  };
  const handleInputChange = (fieldName, e) => {
    e.persist();
    setDirigeant((prev) => ({
      ...prev,
      [fieldName]: e.target?.value ? e.target.value : "",
    }));
  };

  const { nom, prenom, dmax, dmin } = dirigeant;

  return (
    <div>
      <span>
        Rechercher toutes les structures liées à une personne (dirigeant(e), ou
        élu(e)) :
      </span>

      <div className="form-inputs">
        <input
          id={`${id}-prenom`}
          name={`prenom`}
          value={prenom}
          onChange={(e) => handleInputChange("prenom", e)}
          placeholder={"Prénom"}
          className="custom-dropdown-button "
        />
        <input
          id={`${id}-nom`}
          name={`nom`}
          value={nom}
          onChange={(e) => handleInputChange("nom", e)}
          placeholder={"Nom"}
          className="custom-dropdown-button "
        />
      </div>
      <div className="form-date-inputs">
        <label htmlFor={id}>Né(e) entre :</label>
        <div className="form-inputs">
          <input
            id={`${id}-start`}
            type="date"
            value={dmin}
            onChange={(e) => handleInputChange("dmin", e)}
            className="custom-dropdown-button "
          />
          &nbsp;et&nbsp;
          <input
            id={`${id}-end`}
            value={dmax}
            type="date"
            onChange={(e) => handleInputChange("dmax", e)}
            className="custom-dropdown-button "
          />
        </div>
      </div>
      <div className="form-buttons">
        <button onClick={reset}>Effacer</button>

        <button className="bordered" onClick={submitDirigeant}>
          Appliquer
        </button>
      </div>
    </div>
  );
};

DirigeantFromFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
};

export default DirigeantFromFilter;
