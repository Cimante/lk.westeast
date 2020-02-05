const mongoose = require('mongoose');

// НЕ ИСПОЛЬЗУЙ ПОЛЕ "DEFAULT" - ОНО НАРУШАЕТ ПОРЯДОК
// Всякий раз, когда меняются атрибуты полей (unique/require и т.д.) пересоздавай базу :)
const USchema = new mongoose.Schema({
	FirstName			: { type: String, require: true },
	LastName			: { type: String, require: true },
	MiddleName			: { type: String, require: true },
	Office				: { type: String, require: true, unique: false, sparse: true },
	Email				: { type: String, require: true, unique: false },
	Password			: { type: String, require: true },
	Phone				: { type: String, require: true },
	Role				: { type: String, require: true },
	FullCompanyName		: { type: String, require: true },
	ShortCompanyName	: { type: String, require: true },
	Address				: { type: String, require: true },
	INN					: { type: String, require: false, unique: false },
	KPP					: { type: String, require: false, unique: false },
	OGRN				: { type: String, require: false, unique: false },
	Bank				: { type: String, require: false, unique: false },
	BIK					: { type: String, require: false, unique: false },
	CorporateAcc		: { type: String, require: false, unique: false },
	PaymentAcc			: { type: String, require: false, unique: false },
	Calls: [{
		Office			: { type: String, require: true },
		Date			: { type: Date, require: true},
		Timestamp		: { type: String, require: true },
		Status			: { type: String, require: true },
	}],
	Passports: [{
		Office 			: { type: String, require: true },
		Date			: { type: Date, require: true },
		Starttime		: { type: String, require: true },
		Endtime			: { type: String, require: true },
		Wealth			: { type: String, require: false },
		Quantity		: { type: Number, require: true },
		Car				: { type: String, require: true },
		TenantRepres	: { type: String, require: true },
		Status	 		: { type: String, require: true }
	}],
	LossCards: [{
		Office 			: { type: String, require: true },
		CardID			: { type: String, require: false },
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
		Cargo 			: { type: String, require: false },
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

mongoose.model('User', USchema);