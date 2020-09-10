const nodemailer = require('nodemailer');
const AppError = require('./appError');

const sendEmail = async (options) => {
	// 1) Create a transpoter.........
	const transpoter = nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "c2e11b2e40fe93",
			pass: "eba0f7cfe2a78d"
		}
	});

	// 2) Define the email options....
	const mailoptions = {
		from: 'Debarshi Mondal <debopiku@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.message
	}


	// 3) Actually send the email.......
	await transpoter.sendMail(mailoptions);
}

module.exports = sendEmail;