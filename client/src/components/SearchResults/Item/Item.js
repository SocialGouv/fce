import React from "react";
import { withRouter } from "react-router-dom";

class Item extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <tr onClick={e => this.props.history.push("/")} className="result-item">
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    );
  }
}

export default withRouter(Item);
