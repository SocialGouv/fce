import React, { Component } from "react";
import { Alert } from "reactstrap";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Alert color="primary">Hey {this.props.user.username}</Alert>

        <section className="home-section">
          <button onClick={this.props.logout}>Se déconnecter</button>
        </section>
      </div>
    );
  }
}

export default Home;
