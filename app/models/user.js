const mongoose = require('mongoose');

// НЕ ИСПОЛЬЗУЙ ПОЛЕ "DEFAULT" - ОНО НАРУШАЕТ ПОРЯДОК
const UserSchema = new mongoose.Schema({
	FirstName			: { type: String, require: true },
	LastName			: { type: String, require: true },
	MiddleName			: { type: String, require: true },
	Office				: { type: String, require: true, dropDubs: true },
	Email				: { type: String, require: true, unique: true, dropDubs: true },
	Password			: { type: String, require: true },
	Phone				: { type: String, require: true },
	Role				: { type: String, require: true },
	FullCompanyName		: { type: String, require: true },
	ShortCompanyName	: { type: String, require: true },
	Address				: { type: String, require: true },
	INN					: { type: String, require: true, unique: true, dropDubs: true },
	KPP					: { type: String, require: true, unique: true, dropDubs: true },
	OGRN				: { type: String, require: true, unique: true, dropDubs: true },
	Bank				: { type: String, require: true },
	BIK					: { type: String, require: true, unique: true, dropDubs: true },
	CorporateAcc		: { type: String, require: true },
	PaymentAcc			: { type: String, require: true },
	Calls: [{
		Office			: { type: String, require: true },
		Date			: { type: Date, require: true},
		Timestamp		: { type: String, require: true },
		Status			: { type: String, require: true },
	}],
	Passports: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true },
		TimeFromTo		: { type: String, require: true },
		MaterialValues	: { type: String, require: false },
		Quantity		: { type: Number, require: true },
		Car				: { type: String, require: true },
		TenantRepres	: { type: String, require: true },
		Status	 		: { type: String, require: true }
	}],
	LossCards: [{
		Office 			: { type: String, require: true },
		CardNumber		: { type: String, require: true },
		RegisteredIn 	: { type: String, require: true },
		CompanyName 	: { type: String, require: true },
		Status			: { type: String, require: true }
	}],
	DocsOrders: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true },
		Doctype			: { type: String, require: true },
		Status			: { type: String, require: true }
	}],
	PassCars: [{
		Office			: { type: String, require: true },
		Date			: { type: Date, require: true },
		CarBrand		: { type: String, require: true },
		GovermentNumber : { type: String, require: true },
		Status			: { type: String, require: true }
	}],
	WorkersOrders: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true },
		Responsible		: { type: String, require: true },
		Phone			: { type: String, require: true },
		Worktype		: { type: String, require: true },
		Status			: { type: String, require: true }
	}]
});

mongoose.model('User', UserSchema);