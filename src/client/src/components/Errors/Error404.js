import React from "react";
import "./errors.scss";

class Error404 extends React.Component {
  render() {
    return (
      <div className="container app-error">
        <div className="columns justify-content-md-center">
          <div className="column is-8">
            <h1 className="title">Page introuvable</h1>

            <p className="description">
              La page que vous avez demandée est introuvable
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
