import React from "react";

class QuickAccess extends React.Component {
  render() {
    let items = this.props.sections.map((block, index) => (
      <li className="nav-item" key={index}>
        <a className="link" href={"#" + block.id}>
          {block.name}
        </a>
      </li>
    ));

    return (
      <aside className="aside-contain quick-access-aside col-md-2">
        <h1 className="title h6">Accès Rapide</h1>

        <nav>
          <ul className="nav-list">{items}</ul>
        </nav>
      </aside>
    );
  }
}

export default QuickAccess;
