const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const { checkCredits, requireLogin } = require("../middleware");
const { surveyTemplate } = require("../services/emailTemplates");
const Mailer = require("../services/Mailer");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, (req, res) => {});
  app.post("/api/surveys", requireLogin, checkCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      author: req.user.id,
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      res.send(await req.user.save());
    } catch (e) {
      res.status(422).send(e);
    }
  });
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for answering the survey!");
  });
  app.post("/api/surveys/webhooks", (req, res) => {});
};
