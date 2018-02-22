import React, { Component } from "react";
import { Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/fontawesome-pro-solid";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Alert color="primary">
          <FontAwesomeIcon icon={faCoffee} />Hey {this.props.user.username}
        </Alert>

        <section className="home-section">
          <button onClick={this.props.logout}>Se déconnecter</button>
        </section>
      </div>
    );
  }
}

export default Home;
