import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import fieldConfig from "./fieldConfig";

const validate = (values) => {
  const err = {};
  err.recipients = validateEmails(values.recipients) || "";
  fieldConfig.forEach(({ name }) => {
    if (!values[name]) err[name] = "This field is required";
  });
  return err;
};

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false,
})(
  class SurveyForm extends Component {
    renderFields() {
      return _.map(fieldConfig, ({ name, label }) => (
        <Field
          key={name}
          type="text"
          name={name}
          label={label}
          component={SurveyField}
        />
      ));
    }

    render() {
      return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.showReview)}>
            <div>{this.renderFields()}</div>
            <Link to="/surveys" className="btn red lighten-1">
              Cancel
            </Link>
            <button type="submit" className="btn green lighten-1 right">
              Next
            </button>
          </form>
        </div>
      );
    }
  }
);
