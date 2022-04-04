import "./errors.scss";

import React from "react";

class Error403 extends React.Component {
  render() {
    return (
      <div className="container app-error">
        <div className="columns justify-content-md-center">
          <div className="column is-8">
            <h1 className="title">Accès refusé</h1>

            <p className="description">
              Vous n{"'"}avez pas les autorisations nécessaires pour accéder à
              cette page
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error403;
