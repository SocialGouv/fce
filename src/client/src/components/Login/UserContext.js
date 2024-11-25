import axios from "axios";
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

import Config from "../../services/Config";

const SERVER_URL = Config.get("api_endpoint");

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    axios
      .get(`${SERVER_URL}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);

        // Mettre à jour le contexte utilisateur
        updateUser(null);
        // Rediriger vers la page de connexion ou d'accueil
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion", error);
      });
  };

  return (
    <UserContext.Provider value={{ logout, updateUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
