import PropTypes from "prop-types";
import React, { useState } from "react";

const DirigeantFromFilter = ({
  removeFilter,
  addFilter,
  id,
  filters,
  onToggleMenu,
  onFormSubmit,
}) => {
  const [dirigeant, setDirigeant] = useState({
    nom: filters?.dirigeant?.nom || "",
    prenom: filters?.dirigeant?.prenom || "",
  });

  const submitDirigeant = (e) => {
    e.preventDefault();
    onToggleMenu(e);
    onFormSubmit(e);
  };

  const reset = (e) => {
    e.preventDefault();
    setDirigeant({ nom: "", prenom: "" });
    removeFilter(id);
    onToggleMenu(e);
    onFormSubmit(e);
  };

  const handleInputChange = (fieldName, e) => {
    e.persist(); // If you're using React 17 or newer, this line is not necessary

    setDirigeant((prev) => {
      const updatedDirigeant = {
        ...prev,
        [fieldName]: e.target?.value,
      };

      addFilter(id, updatedDirigeant);

      return updatedDirigeant;
    });
  };

  const { nom, prenom } = dirigeant;

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
  onFormSubmit: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default DirigeantFromFilter;
