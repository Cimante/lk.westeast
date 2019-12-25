const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'remington19@ethereal.email',
        pass: 'prx24wvfwvrZCEGAGj'
    }
});

const mailer = message => {
	transporter.sendMail(message, (err, info) => {
		if (err) return console.log(err);
	})
	
}

module.exports = mailer;