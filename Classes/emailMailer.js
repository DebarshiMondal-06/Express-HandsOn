const nodemailer = require('nodemailer');
const AppError = require('./appError');
const pug = require('pug');
const htmlToText = require('html-to-text');

// new Email(user, url).sendWelcome();


module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Debarshi Mondal <${process.env.EMAIL_FROM}>`;
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			return 1; //sedngrid......
		}
		return nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "c2e11b2e40fe93",
				pass: "eba0f7cfe2a78d"
			}
		});
	}

	async send(template, subject) {
		
		// 1) Render email template........................
		const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
			firstName: this.firstName,
			url: this.url,
			subject
		});

		// 2) Define the email options....
		const mailoptions = {
			from: this.from,
			to: this.to,
			subject,
			html: html,
			text: htmlToText.fromString(html)
		}

		// 3) Transpoter and send email finally......
		await this.newTransport().sendMail(mailoptions);

	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the Natours!');
	}
};
