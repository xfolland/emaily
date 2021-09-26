import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import StripePayments from "./StripePayments";

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
                <StripePayments />
              </li>
              <li style={{ marginLeft: "15px", marginRight: "5px" }}>
                Credits: {this.props.auth.credits}
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
