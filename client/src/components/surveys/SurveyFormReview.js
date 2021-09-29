import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import fieldConfig from "./fieldConfig";
import { submitSurvey } from "../../actions";

export default connect((state) => ({ form: state.form.surveyForm.values }), {
  submitSurvey,
})(
  withRouter(
    class SurveyFormReview extends Component {
      renderFields() {
        return _.map(fieldConfig, ({ name, label }) => (
          <div key={name}>
            <label>{label}</label>
            <div>{this.props.form[name]}</div>
          </div>
        ));
      }

      render() {
        return (
          <div>
            <h4>Please review your form</h4>
            <div style={{ marginBottom: "20px" }}>{this.renderFields()}</div>
            <button className="btn red lighten-1" onClick={this.props.showForm}>
              Back
            </button>
            <button
              className="btn green lighten-1 right"
              onClick={() =>
                this.props.submitSurvey(this.props.form, this.props.history)
              }
            >
              Send Surveys <i className="material-icons right">email</i>
            </button>
          </div>
        );
      }
    }
  )
);
