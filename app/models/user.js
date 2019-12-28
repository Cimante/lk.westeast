const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	FirstName			: { type: String, require: true },
	LastName			: { type: String, require: true },
	MiddleName			: { type: String, require: true },
	Office				: { type: String, require: true },
	Email				: { type: String, require: true, unique: true },
	Password			: { type: String, require: true },
	Phone				: { type: String, require: true },
	Role				: { type: String, require: true },
	FullCompanyName		: { type: String, require: true },
	ShortCompanyName	: { type: String, require: true },
	Address				: { type: String, require: true },
	INN					: { type: String, require: true, unique: true },
	KPP					: { type: String, require: true, unique: true },
	OGRN				: { type: String, require: true, unique: true },
	Bank				: { type: String, require: true },
	BIK					: { type: String, require: true, unique: true },
	CorporateAcc		: { type: String, require: true },
	PaymentAcc			: { type: String, require: true },
	Calls: [{
		Office			: { type: String, require: true },
		Date			: { type: Date, require: true, default: new Date() },
		Timestamp		: { type: String, require: true },
		Status			: { type: String, require: true, default: 'Отправлено' },
	}],
	Passports: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true, default: new Date() },
		TimeFromTo		: { type: String, require: true },
		MaterialValues	: { type: String, require: false },
		Quantity		: { type: Number, require: true, default: 1 },
		Car				: { type: String, require: true },
		TenantRepres	: { type: String, require: true },
		Status	 		: { type: String, require: true, default: 'Отправлено' }
	}],
	LossCards: [{
		Office 			: { type: String, require: true },
		CardNumber		: { type: String, require: true },
		RegisteredIn 	: { type: String, require: true },
		CompanyName 	: { type: String, require: true },
		Status			: { type: String, require: true, default: 'Отправлено' }
	}],
	DocsOrders: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true, default: new Date() },
		Doctype			: { type: String, require: true },
		Status			: { type: String, require: true, default: 'Отправлено' }
	}],
	PassCars: [{
		Office			: { type: String, require: true },
		Date			: { type: Date, require: true, default: new Date() },
		CarBrand		: { type: String, require: true },
		GovermentNumber : { type: String, require: true },
		Status			: { type: String, require: true, default: 'Отправлено' }
	}],
	WorkersOrders: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true, default: new Date() },
		Responsible		: { type: String, require: true },
		Phone			: { type: String, require: true },
		Worktype		: { type: String, require: true },
		Status			: { type: String, require: true, default: 'Отправлено' }
	}]
});

mongoose.model('User', UserSchema);