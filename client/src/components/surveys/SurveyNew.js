import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

export default reduxForm({ form: "surveyForm" })(
  class SurveyNew extends Component {
    state = { showReview: false };

    render() {
      return (
        <div>
          {this.state.showReview ? (
            <SurveyFormReview
              showForm={() => this.setState({ showReview: false })}
            />
          ) : (
            <SurveyForm
              showReview={() => this.setState({ showReview: true })}
            />
          )}
        </div>
      );
    }
  }
);
