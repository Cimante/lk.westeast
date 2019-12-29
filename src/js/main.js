// здесь будем брать данные из полей форм, проверять их и стрелять поповерами

// TODO: Завести на клик по элементу навигации функцию с POST-запросом. 
// 		 В ответе массив объектов. Если admin, то возвращать массив ото всех пользователей.
//		 Если user, то только свои заявки

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
	$.ajax({
		url: '/read-data',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({Arr: Arr})
	}).done(function(data) {
		$(document).ready(function() {
			var htmlString = "";
			for (let item in data.response) {
				htmlString += `<tr class="animated fadeIn faster">`;
				for(let item_0 in data.response[item]) {
					if (item_0 === "_id") continue;
					htmlString += `<td>${data.response[item][item_0]}</td>`
				}
				htmlString += `</tr>`;
			}
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

window.onload = function() {
	// Искать тэг a с классами nav-item active
	// Если у найденного тэга id #v-pills-one-tab, то ReadUsers();
	// Иначе брать data-query этот тэга и в ReadData();
	ReadUsers();
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

	$('button[form="createNewUser--Form"]').click(function() {
		const data = getNewUserData();

		$.ajax({
			url: '/add-user',
			type: 'POST',
			data: data,
		}).done(function(data) {
			alert(`Пользователь ${data.email} успешно добавлен!`);
			window.location.reload();
		})
	});

	$('a[data-query]').click(function() {
		ReadData($(this).data('query'), $(this).attr('href'));
	});

	// ===============================================================

	$('button[form]').click(function(e) {
		e.preventDefault();

		let inputs = $(`form#${ $(this).attr('form') }`).find('input');
		let storage = {};
		$.each(inputs, function(key, value) {
			storage[value.name] = value.value;
		});
		if ($(this).data('storage')) {
			storage.ArrayName = $(this).data('storage');
		}
		if ($(this).data('id')) {
			let temp = JSON.parse($(this).data('id'));
			storage.id = temp.id;
		}

		$.ajax({
			url:'/insert-data',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(storage)
		}).done(function(data) {
			alert('Успешно!');
			window.location.reload();
		}).fail(function(data) {
			alert(`Всё пошло не по плану.\n${data.response}`);
			// в случае фэйла возвращать массив некорректных полей. вызывать invalid для них
		})
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
	
});