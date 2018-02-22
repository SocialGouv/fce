import React, { Component } from "react";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        Hey {this.props.user.username}
        <section className="home-section">
          <button onClick={this.props.logout}>Se déconnecter</button>
        </section>
      </div>
    );
  }
}

export default Home;
