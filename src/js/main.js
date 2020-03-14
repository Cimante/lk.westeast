// здесь будем брать данные из полей форм, проверять их и стрелять поповерами

function ReadUsers() {
	$.ajax({
		url: '/read-users',
		type: 'POST',
		contentType: 'application/json',
		data: ''
		}).done(function(users) {
			$(document).ready(function() {
				for (let user in users.response) {
					$('tbody#content_0--body').append(`
					<tr class="animated fadeIn faster">
					<td>${users.response[user].Office}</td>
					<td>${users.response[user].LastName}</td>
					<td>${users.response[user].FirstName}</td>
					<td>${users.response[user].MiddleName}</td>
					<td>${users.response[user].Email}</td>
					<td>
						<button class="btn btn-warning btn-sm mr-2" id="userUpdate" type="button" data-id="${user}" data-toggle="modal" data-target="#updateUser">
							<span>Редактировать</span>
						</button>
						<button class="btn btn-danger btn-sm" id="userDelete" type="button" data-id="${user}">
							<span>Удалить</span>
						</button>
					</td>
					</tr>
					`);
				}
			})
		});
};

/**
 * @desc Чтение записей из БД по названию массива внутри пользователя 
 * @param {String} Arr название массива
 * @param {String} Selector селектор тела таблицы
 */
function ReadData(Arr, Selector) {
	const addZero = (date) => {
		if (date < 10) return `0${date}`
		else return date;
	}

	$.ajax({
		url: '/read-data',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({Arr: Arr})
	}).done(function(data) {
		if (data.length > 0) $(document).ready(function() {
			var htmlString = "";
			for (let row in data) {
				htmlString += '<tr>';
				for (let item in data[row]) {
					if (item == "_id" || item == "role" || item == "UserID") continue;
					if (item == "Date" || item == "ValidUntil") {
						let tempDate = new Date(data[row][item]);
						data[row][item] = `${addZero(tempDate.getDate())}-${addZero(tempDate.getMonth() + 1)}-${tempDate.getFullYear()}`;
					}

					// преобразование статусов
					if (item === 'Status') {
						switch(data[row][item]) {
							case 'Отправлено':
								htmlString += `<td>Новая</td>`;
								break;
							case 'Просмотрено':
								htmlString += '<td id="viewed">Просмотрено</td>';
								break;
							case 'Обработано': 
								htmlString += '<td id="processed">Обработано</td>';
								break;
							case 'Отклонено':
								htmlString += '<td id="rejected">Отклонено</td>'
						}
						continue;
					}

					// для пропусков
					if (item === "Starttime") continue;
					if (item === "Endtime") {
						htmlString += `<td>${data[row]["Starttime"]} - ${data[row]["Endtime"]}</td>`;
						continue;
					}
					// общий случай (для всего остального):
					htmlString += `<td>${data[row][item]}</td>`
				}

				// кнопочки:
				if ((data[row]["Status"] === 'Отправлено' || data[row]["Status"] === 'Просмотрено') && (data[row]["Role"] !== 'user')) {
					htmlString += `<td>`;
					htmlString += `<button class="btn btn-primary btn-sm mr-2" id="processedDecl" data-id="${data[row]["_id"]}" data-userID="${data[row]["UserID"]}" data-storage="${Arr}">
						<div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Обработана</button>`;
					htmlString += `<button class="btn btn-danger btn-sm mr-2" id="rejectedDecl" data-id="${data[row]["_id"]}" data-userID="${data[row]["UserID"]}" data-storage="${Arr}">
						<div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Отклонить</button>`;
					htmlString += `<button class="btn btn-outline-danger btn-sm mr-2" id="deleteDecl" data-id="${data[row]["_id"]}" data-userID="${data[row]["UserID"]}" data-storage="${Arr}">
						<div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Удалить</button>`;
					htmlString += `</td>`;
				} else {
					htmlString += `<td><button class="btn btn-outline-danger btn-sm" id="deleteDecl" data-id="${data[row]["_id"]}" data-userID="${data[row]["UserID"]}" data-storage="${Arr}">Удалить</button></td>`;
				}
				htmlString += `</tr>`;

				if (data[row]["Status"] === 'Отправлено') {
					let updateResponse = {
						id: data[row]["_id"],
						storage: Arr,
						status: "Просмотрено"
					}

					$.ajax({
						url: '/update-status',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(updateResponse)
					}).done(function() {
						$.ajax({
							url: '/get-counters',
							type: 'POST',
							contentType: 'application/json',
						}).done(function(data) {
							for (let key in data) {
								if (data[key] > 0) {
									$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').removeClass('d-none');
									$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').text(data[key]);
								} else {
									if (!$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').hasClass('d-none')) {
										$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').addClass('d-none');
									}
								}
								
								if ($(`a.nav-link[data-query="${key}"]`).find('#counterBadge').text() === "0") {
									$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').addClass('d-none');
								} else $(`a.nav-link[data-query="${key}"]`).find('#counterBadge').removeClass('d-none');
								
							}
						}).fail(function() {
							alert('Ошибка чтения счётчиков')
						})
					}).fail(function(message) {
						alert(`Ошибка: ${JSON.stringify(message)}`);
					})
				}
			}
			if (!$(`tbody${Selector}--body`).hasClass('animated')) $(`tbody${Selector}--body`).addClass("animated fadeIn faster");
			$(`tbody${Selector}--body`).html(htmlString);
		});
	});
}
				
function getNewUserData() {
	const data = {
		LastName: $('#LastName').val(),
		FirstName: $('#FirstName').val(),
		MiddleName: $('#MiddleName').val(),
		Office: $('#Office').val(),
		Email: $('#Email').val(),
		Phone: $('#Phone').val(),
		FullCompanyName: $('#FullCompanyName').val(),
		ShortCompanyName: $('#ShortCompanyName').val(),
		Address: $('#Address').val(),
		INN: $('#INN').val(),
		KPP: $('#KPP').val(),
		OGRN: $('#OGRN').val(),
		OKPO: $('#OKPO').val(),
		Bank: $('#Bank').val(),
		BIK: $('#BIK').val(),
		CorporateAcc: $('#CorporateAcc').val(),
		PaymentAcc: $('#PaymentAcc').val()
	}
	return data;
}
// ====================================================================================

function validate(inputs) {
	// TODO: проверка номера телефона, email и длины всякой юр.инфы
	let errors = []; 	// массив значений атрибутов name некорректных полей ввода
	let storage = {};

	$.each(inputs, function(key, value) {
		// пропускаем Номер карты
		if (value.name === 'CardID') {
			storage[value.name] = "(не указан)";
			return;
		}

		if ((value.value.length === 0) || (value.value.indexOf('_') >= 0)) {
			errors.push(value.name);
		} else {
			storage[value.name] = value.value;
		}
	});

	// для пропусков на внос/вынос:
	if (storage.Starttime) {
		let start = storage.Starttime.split(":");
		let end = storage.Endtime.split(":");

		start = Number(start[0])*60 + Number(start[1]);
		end = Number(end[0])*60 + Number(end[1]);

		if (start >= end) {
			errors.push('Starttime', 'Endtime');
		}
	}

	if (storage.Date) {
		let tempDate = new Date(storage.Date).getTime();
		let now = new Date();
		let currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

		if (tempDate < currDate) {
			errors.push('Date');
			delete storage.Date;
		}
	}

	if (storage.Phone) {
		if (storage.Phone[4] !== '9' && storage.Phone[4] !== '4') {
			errors.push('Phone');
			delete storage.Phone;
		}
	}

	if (storage.Email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(storage.Email).toLowerCase())) {
			errors.push('Email');
			delete storage.Email;
		}
	}
	return errors
}

// ====================================================================================

window.onload = function() {
	$(document).ready(function () {
		if ($('a.nav-link.active').attr('id') === 'v-pills-one-tab') {
			ReadUsers();
		} else {
			ReadData('Guests', '#create-guest-pass');
		}

		// маски ввода
		$('input[name="Phone"]').inputmask("+7 (999) 999-99-99");
		$('input[name="INN"]').inputmask('9{10,12}');
		$('input[name="KPP"]').inputmask('9{9}');
		$('input[name="OGRN"]').inputmask('9{13}');
		$('input[name="OKPO"]').inputmask('9{8,10}');
		$('input[name="BIK"]').inputmask('9{9}');
		$('input[name="CorporateAcc"]').inputmask('9{20}');
		$('input[name="PaymentAcc"]').inputmask('9{20}');
		$('input[name="GovermentNumber"]').inputmask('A 999 AA — 9{2,3}');

		$.ajax({
			url: '/get-counters',
			type: 'POST',
			contentType: 'application/json'
		}).done(function(data) {
			for (let key in data) {
				if (data[key] > 0) {
					$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').text(data[key]);
				}
			}
			const update = setInterval(() => {
				$.ajax({
					url: '/get-counters',
					type: 'POST',
					contentType: 'application/json'
				}).done(function(data) {
					for (let key in data) {
						if (data[key] > 0) {
							$(`a.nav-link[data-query="${key}"]`).find('#counterBadge').text(data[key]);
							
							ReadData($('a.nav-link.active').data('query'), $('a.nav-link.active').attr('href'));
						}
					}
					}).fail(function() {})
				}, 3000);
		}).fail(function(data) {});
	});
}

$(document).ready(function() {
	if (window.location.pathname === '/create-success') {
		if (localStorage.getItem('new_email')) {
			$('#new-email').text(`${localStorage.getItem('new_email')} `);
			localStorage.removeItem('new_email');
		} else {
			window.location.replace('/');
		}
	}

	$('button#sendNewUser').click(function(e) {
		e.preventDefault();
		$.ajax({
			url: '/add-user',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(getNewUserData())
		}).done(function(data) {
			localStorage.setItem('new_email', data.email);
			window.location.replace('/create-success');
		});
	});
	
	$('button#btn_log').on('click', function(e) {
		e.preventDefault();
		$(this).attr('disabled', true);
		$(this).children('.spinner-border').removeClass('d-none');

		let data = {
			email: $('input#login').val(),
			password: $('input#pass').val()
		};

		$.ajax({
			url: '/login',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function(data) {
			if (data.ok) {
				if (!$('span#invalid').hasClass('d-none')) {
					$('span#invalid').addClass('d-none');
				}
				window.location.reload();
			}
		}).fail(function(data) {
			data = JSON.parse(JSON.stringify(data));
			$('span#invalid').removeClass('d-none').addClass('text-center').text(data.responseJSON.message);
			$('button#btn_log').attr('disabled', false);
			$('button#btn_log').children('.spinner-border').addClass('d-none');
		})
	});

	$('button#logout').click(function() {
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: null
		}).done(function() {
			alert('EXIT SUCCESS');
		})
	});
	
	$('a[data-query]').click(function() {
		ReadData($(this).data('query'), $(this).attr('href'));
	});

	const reloadData = setInterval(() => {
		ReadData($('a.nav-link.active').data('query'), $('a.nav-link.active').attr('href'))
	}, 3000)
	
	// ===============================================================

	// процесс сбора данных из форм, валидация и POST-запрос если всё устраивает
	$('button[form]').click(function(e) {
		e.preventDefault();
		let inputs = $(`form#${ $(this).attr('form') }`).find("input, textarea");
		let storage = {};
		$.each(inputs, function(key, value) {
			// пропускаем Номер карты
			if (value.name === 'CardID') {
				storage[value.name] = "(не указан)";
				return;
		}
			if (value.value.length !== 0) storage[value.name] = value.value;
		});
		if (validate(inputs).length === 0) {
			if ($(this).data('storage')) {
				storage.ArrayName = $(this).data('storage');
			}
			if ($(this).data('id')) {
				let temp = JSON.parse($(this).data('id'));
				storage.id = temp.id;
			}
			
			// если это форма добавления пользователя, то отправляем в add-user, 
			// иначе просто insert-data
			if ($(this).attr('form') === 'createNewUser--Form') {
				$.ajax({
					url: '/add-user',
					type: 'POST',
					data: storage,
				}).done(function(data) {
					alert(`Пользователь ${data.email} успешно добавлен!`);
					window.location.reload();
				}).fail(function(data) {
					alert(`${JSON.stringify(data)}`);
				})

			} else {
				$.ajax({
					url:'/insert-data',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(storage)
				}).done(function(data) {
					alert('Успешно!');
					window.location.reload();
				}).fail(function(data) {
					alert(`Не удалось добавить...\n${data.response}`);
				})
			}

		} else {
			$.each(validate(inputs), function(key, value) {
				$(`input[name=${value}]`).addClass('is-invalid');
				$(`input[name=${value}]`).on('keyup, change', function() {
					$(this).removeClass('is-invalid');
				});
				$('button[aria-label="close"], button[data-dismiss="modal"]').on('click', function() {
					$('input[name]').removeClass('is-invalid');
				})
			});
		}
	});

	// просто click не сработает на кнопке, которой нет в DOM-дереве изначально
	// так что вешаем событие несколько иначе:
	$('body').on('click', 'button#userUpdate', function() {
		const id = JSON.stringify({ id: $(this).data('id') });
		$('button[form="updateUser--Form"]').data('id', id);

		$.ajax({
			url: '/read-user',
			type: 'POST',
			contentType: 'application/json',
			data: id
		}).done(function(data) {
			for (let item in data.response) {
				$('#updateUser--Form').find(`input[name="${item}"]`).val(data.response[item]).attr('disabled', false);
			}
		});
	});

	$('body').on('click', 'button#userDelete', function() {
		// показать лоадер
		if (confirm('Удалить пользователя?')) {
			$.ajax({
				url: '/delete-user',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify( {id: $(this).data('id') })
			}).done(function(data) {
				alert('Пользователь успешно удалён!');
				window.location.reload();
			});
		}
	});

	$('body').on('click', 'button#deleteDecl', function() {
		if (confirm('Удалить эту заявку?')) {
			let data = {
				userID: $(this).data('userid'),
				id: $(this).data('id'),
				storage: $(this).data('storage')
			};
			$.ajax({
				url: '/delete-data',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data)
			}).done(function(response) {
				alert('Заявка успешно удалена\n', response);
				window.location.reload();
			})
		}
	});

	$('body').on('click', 'button#processedDecl', function() {
		$(this).find('div.spinner-border').removeClass('d-none')
		let data = {
			id: $(this).data('id'),
			storage: $(this).data('storage'),
			status: "Обработано"
		}
		$.ajax({
			url: '/update-status',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function() {
			ReadData($('a.nav-link.active').data('query'), $('a.nav-link.active').attr('href'));
		}).fail(function(message) {
			$(this).find('div.spinner-border').addClass('d-none')
			alert(`Ошибка: ${JSON.stringify(message)}`);
		})
	})

	$('body').on('click', 'button#rejectedDecl', function() {
		$(this).find('div.spinner-border').removeClass('d-none')
		let data = {
			id: $(this).data('id'),
			storage: $(this).data('storage'),
			status: "Отклонено"
		}
		$.ajax({
			url: '/update-status',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function() {
			ReadData($('a.nav-link.active').data('query'), $('a.nav-link.active').attr('href'));
		}).fail(function(message) {
			$(this).find('div.spinner-border').addClass('d-none')
			alert(`Ошибка: ${JSON.stringify(message)}`);
		})
	})
});