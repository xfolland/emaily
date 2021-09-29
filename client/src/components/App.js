import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Landing from "./Landing";
import SurveyNew from "./surveys/SurveyNew";
import { fetchUser } from "../actions";

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
