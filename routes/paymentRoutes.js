const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { requireLogin } = require("../middleware");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: "aud",
      description: "5 Emaily credits",
      source: req.body.id,
    }); // should add err check
    req.user.credits += 5;
    return res.send(await req.user.save());
  });
};
