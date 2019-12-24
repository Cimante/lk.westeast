const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	FirstName: String,
	LastName: String,
	MiddleName: String,
	Office: String,
	Email: String,
	Password: String,
	Phone: String,
	Role: String,
	FullCompanyName: String,
	ShortCompanyName: String,
	Address: String,
	INN: String,
	KPP: String,
	OGRN: String,
	Bank: String,
	BIK: String,
	CorporateAcc: String,
	PaymentAcc: String,
	Calls: [{
		Office: String,
		Date: Date,
		Timestamp: String,
		Status: String
	}],
	Passports: [{
		Office: String,
		Date: Date,
		TimeFromTo: String,
		MaterialValues: String,
		Quantity: Number,
		Car: String,
		TenantRepres: String,
		Status: String
	}],
	LossCards: [{
		Office: String,
		CardNumber: String,
		RegisteredIn: String,
		CompanyName: String,
		Status: String
	}],
	DocsOrders: [{
		Office: String,
		Date: Date,
		Doctype: String,
		Status: String
	}],
	PassCars: [{
		Office: String,
		Date: Date,
		CarBrand: String,
		GovermentNumber: String,
		Status: String
	}],
	WorkersOrders: [{
		Office: String,
		Date: Date,
		Responsible: String,
		Phone: String,
		Worktype: String,
		Status: String
	}]
});

mongoose.model('User', UserSchema);