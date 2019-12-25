// здесь будем брать данные из полей форм, проверять их и стрелять поповерами

$(document).ready(function() {
	if (window.location.pathname === '/create-success') {
		if (localStorage.getItem('new_email')) {
			$('#new-email').text(`${localStorage.getItem('new_email')} `);
			localStorage.removeItem('new_email');
		} else {
			window.location.replace('/');
		}
	}
	
	$("button#sendNewUser").click(function(e) {
		e.preventDefault();

		let data = {
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

		$.ajax({
			url: '/add-user',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function(data) {
			localStorage.setItem('new_email', data);
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

	if (localStorage.getItem('name') && window.location.pathname === '/dashboard') {
		$('#username').text(localStorage.getItem('name'));
	}

	$('button#logout').click(function() {
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: null
		}).done(function() {
			alert('EXIT SUCCESS');
		})
	});

});