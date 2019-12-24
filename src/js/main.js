// здесь будем брать данные из полей форм, проверять их и стрелять поповерами

$(document).ready(function() {
	if (window.location.pathname === '/create-success') {
		if (localStorage.getItem('email')) {
			$('#new-email').text(`${localStorage.getItem('email')} `);
			localStorage.removeItem('email');
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
			localStorage.setItem('email', data);
			window.location.replace('/create-success');
		});
	});
	
	$('button#btn_log').on('click', function(e) {
		e.preventDefault();

		let data = {
			login: $('input#login').val(),
			password: $('input#pass').val()
		};

		$.ajax({
			url: '/login',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).done(function(data) {
			console.log(data);
		})
	});
});