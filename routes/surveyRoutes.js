const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
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
  app.get("/api/surveys/:id/:ans", (req, res) => {
    res.send("Thanks for answering the survey!");
  });
  app.post("/api/surveys/webhooks", async (req, res) => {
    const p = new Path("/api/surveys/:sid/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) return { ...match, email };
      })
      .compact()
      .uniqBy("email", "sid")
      .each(({ choice, email, sid }) => {
        Survey.updateOne(
          {
            _id: sid,
            recipients: { $elemMatch: { email, responded: false } },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponse: Date.now(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });
};
