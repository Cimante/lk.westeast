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
			for (let item in data) {
				for (let item_0 in data[item]) {
					$(`tbody${Selector}--body`).html(`
					<tr class="animated fadeIn faster">
					<td>${data[item][item_0].Office}</td>
					`);
					// TODO: дописать для всех случаев и унифицировать
				}
			}
		})
	})
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

	$('button[form="create-call-decl--Form"]').click(function() {
		const data = {
			Office: $('input#create-call-decl--Office').val(),
			Date: $('input#create-call-decl--Date').val(),
			Timestamp: $('input#create-call-decl--Time').val()
		};

		$.ajax({
			url:'/insert-data',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function(data) {
			alert('Заявка успешно добавлена!');
			window.location.reload();
		});
	});

	$('a[data-query]').click(function() {
		console.log($(this).data('query'), $(this).attr('href'));
		ReadData($(this).data('query'), $(this).attr('href'));
	})
});