import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../actions";

export default connect(null, { handleToken })(
  class StripePayments extends Component {
    render() {
      return (
        <StripeCheckout
          currency="AUD"
          amount={500}
          token={(token) => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          name="Emaily"
          description="Purchase 5 email credits"
        >
          <button className="btn green lighten-1">Add Credits</button>
        </StripeCheckout>
      );
    }
  }
);
