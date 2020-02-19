const mailer = require('./nodemailerPasswords');

/**
 * @description Добавляет для дат ноль слева
 * @param {Number} time 
 * @returns {String}
 */
const addZero = (time) => {
	return (time < 10) ? `0${time}` : `${time}`;
}

/**
 * @description Отправка письма охранникам
 * @param {String} orderType Название заявки (в службу эксплуатации / на пропуск / на пропуск для авто / на работы)
 * @param {String} status Статус заявки (Обработана или Отклонена)
 * @param {Object} details Информация о заявке (названия полей и их значение (кроме поля Статус))
 */
const guardSendMails = (orderType, status, details) => {
	
	let changeOrder = `
		<div style="color: #212529;">
		<h2>Заявка ${ orderType }: <span style="color: ${(status === 'Обработано') ? '#17C671' : '#C4183C' }">${ status.toLocaleLowerCase() }</span></h2>
		<h3>Детали заявки:</h3>
	`;
	
	// Добавляем детали заявки
	// Переводим имена полей объекта на русский
	for (let item in details) {
		switch (item) {
			case '_id'				: continue;
			case 'Status'			: continue;
			case 'Office'			: { changeOrder += `<p><b>Офис:</b> ${ details[item] }</p>`; break }
			case 'Name'				: { changeOrder += `<p><b>ФИО: </b> ${ details[item] }</p>`; break }
			case 'GuestName'		: { changeOrder += `<p><b>ФИО гостя: </b> ${ details[item] }</p>`; break }
			case 'Problem'			: { changeOrder += `<p><b>Описание проблемы:</b> ${ details[item] }</p>`; break }
			case 'Date'				: { changeOrder += `<p><b>Дата:</b> ${ addZero(details[item].getDate()) }.${ addZero(details[item].getMonth() + 1) }.${details[item].getFullYear()}</p>`; break }
			case 'ValidUntil'		: { changeOrder += `<p><b>Действителен до:</b> ${ addZero(details[item].getDate()) }.${ addZero(details[item].getMonth() + 1) }.${details[item].getFullYear()}</p>`; break }
			case 'Timestamp'		: { changeOrder += `<p><b>Время:</b> ${ details[item] }</p>`; break }
			case 'Starttime'		: { changeOrder += `<p><b>Время начала:</b> ${ details[item] }</p>`; break }
			case 'Endtime'			: { changeOrder += `<p><b>Время окончания:</b> ${ details[item] }</p>`; break }
			case 'Wealth'			: { changeOrder += `<p><b>Материальные ценности:</b> ${ details[item] }</p>`; break }
			case 'Quantity'			: { changeOrder += `<p><b>Количество:</b> ${ details[item] }</p>`; break }
			case 'Car'				: { changeOrder += `<p><b>Авто:</b> ${ details[item] }</p>`; break }
			case 'TenantRepres'		: { changeOrder += `<p><b>Представитель арендатора:</b> ${ details[item] }</p>`; break }
			case 'CarBrand'			: { changeOrder += `<p><b>Марка авто:</b> ${ details[item] }</p>`; break }
			case 'GovermentNumber'	: { changeOrder += `<p><b>Гос. номер:</b> ${ details[item] }</p>`; break }
			case 'Cargo'			: { changeOrder += `<p><b>Груз:</b> ${ details[item] }</p>`; break }
			case 'Responsible'		: { changeOrder += `<p><b>Ответственный:</b> ${ details[item] }</p>`; break }
			case 'Phone'			: { changeOrder += `<p><b>Телефон:</b> ${ details[item] }</p>`; break }
			case 'Worktype'			: { changeOrder += `<p><b>Вид работ:</b> ${ details[item] }</p>`; break }
		}
	}
	changeOrder += '</div>';
	
	const send = {
		from: 'Администрация WestEast <lk.west@yandex.ru>',
		to: `<info@westeast.biz>`,
		subject: `Изменение статуса заявки ${orderType}`,
		html: changeOrder
	}
	mailer(send)
}

module.exports = guardSendMails;