const Mailgen = require('mailgen');
const config = require('../config/config');

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = config.link.localHostLink;
        break;
      case 'production':
        this.link = config.link.productionLink;
        break;

      default:
        this.link = config.link.localHostLink;
        break;
    }
  }
  #createTemplateVerifyEmail(token, name) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'System Contacts',
        link: this.link,
      },
    });
    const email = {
      body: {
        name,
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with System Contacts, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
      },
    };

    // Generate an HTML email with the provided contents
    return mailGenerator.generate(email);
  }

  async sendVerifyPasswordEmail(token, email, name) {
    const emailBody = this.#createTemplateVerifyEmail(token, name);
    const result = await this.sender.send({
      to: email,
      subject: 'Verify your account',
      html: emailBody,
    });
    console.log(result);
  }
}

module.exports = EmailService;
