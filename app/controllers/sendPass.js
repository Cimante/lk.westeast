const mailer = require('./nodemailerPasswords');

const sendPassword = (password, email) => {
	const mailWithPass = `
		<p>Вы получили это сообщение, так как этот адрес электронной почты был указан при регистрации</p>
		<p>Пароль для входа в Личный Кабинет WestEast: <strong>${password}</strong></p>
	`;

	const send = {
		from: 'Администрация WestEast <admin@westeast.biz>',
		to: `<${email}>`,
		subject: `Успешная регистрация в Личном Кабинете WestEast`,
		html: mailWithPass
	}

	mailer(send);
}

module.exports = sendPassword;