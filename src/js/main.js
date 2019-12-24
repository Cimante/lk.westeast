/*
$(document).ready(function() {
	$("button#sendNewUser").click(function() {
		$.ajax({
			url: 'http://localhost:3301/add-user',
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
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
			}),
			success: function() {
				alert('WAS SENDED')
			}
		})
	})
});
*/