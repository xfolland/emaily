import React, { Component } from "react";

export default class SurveyField extends Component {
  render() {
    const {
      input,
      label,
      meta: { error, touched },
    } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
        <div
          className="red-text"
          style={{ fontSize: "0.80rem", marginBottom: "15px" }}
        >
          {touched && error}
        </div>
      </div>
    );
  }
}
