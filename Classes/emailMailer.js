const nodemailer = require('nodemailer');
const { options } = require('../Routes/User_Routes');

const sendEmail = async (options) => {
	// 1) Create a transpoter.........
	const transpoter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERANME,
			pass: process.env.EMAIL_PASSWORD
		}
	})

	// 2) Define the email options....
	const mailoptions = {
		from: 'Debarshi Mondal <debopiku1122@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.message
	}


	// 3) Actually send the email.......
	await transpoter.sendMail(mailoptions);
}

module.exports = sendEmail;