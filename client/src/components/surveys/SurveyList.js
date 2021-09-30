import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

export default connect(({ survey }) => ({ survey }), { fetchSurveys })(
  class SurveyList extends Component {
    componentDidMount() {
      this.props.fetchSurveys();
    }

    renderSurveys() {
      return this.props.survey.reverse().map((survey) => (
        <div key={survey.id} className="card darken-1 center">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p>
              Yes: {survey.yes} | No: {survey.no}
            </p>
            <p className="right">
              Originally sent: {new Date(survey.dateSent).toLocaleDateString()}{" "}
              | Last response:{" "}
              {new Date(survey.lastResponse).toLocaleDateString()}
            </p>
          </div>
        </div>
      ));
    }

    render() {
      return <div>{this.renderSurveys()}</div>;
    }
  }
);
