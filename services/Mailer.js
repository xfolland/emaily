const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, body) {
    super();
    this.sgApi = sendgrid(process.env.SENDGRID_API_KEY);
    this.from_email = new helper.Email(process.env.SENDGRID_FROM_EMAIL);
    this.subject = subject;
    this.body = new helper.Content("text/html", body);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const settings = new helper.TrackingSettings();
    settings.setClickTracking(new helper.ClickTracking(true, true));
    this.addTrackingSettings(settings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((reciepient) => {
      personalize.addTo(reciepient);
    });
    this.addPersonalization(personalize);
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  async send() {
    const req = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });
    return await this.sgApi.API(req);
  }
}

module.exports = Mailer;
