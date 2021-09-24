import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default connect((state) => {
  return { auth: state.auth };
})(
  class Header extends Component {
    renderLinks = () => {
      switch (this.props.auth) {
        case null:
          return null;
        case false:
          return (
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          );
        default:
          return (
            <>
              <li>
                <p>this could be another button</p>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          );
      }
    };
    render() {
      return (
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="left brand-logo">
              Emaily
            </Link>
            <ul className="right">{this.renderLinks()}</ul>
          </div>
        </nav>
      );
    }
  }
);
