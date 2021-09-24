import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { fetchUser } from "../actions";
import Landing from "./Landing";

const Dashboard = () => (
  <div>
    <h2>DASHBOARD</h2>
  </div>
);
const SurveyNew = () => (
  <div>
    <h2>NEW SURVEY</h2>
  </div>
);

export default connect(null, { fetchUser })(
  class App extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }

    render() {
      return (
        <div className="container">
          <BrowserRouter>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </BrowserRouter>
        </div>
      );
    }
  }
);
