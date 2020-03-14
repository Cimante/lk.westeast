const mongoose = require('mongoose');
const User = mongoose.model('User');

const BubbleSort = arr => {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			if (arr[j]._id < arr[j + 1]._id) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
}

const ReadData = (req, res) => {
	const Arr = req.body.Arr;
	if (req.session.role === 'admin') {
		User.find({Role: 'user'}, function(err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				if (!!result[user][Arr] && result[user][Arr].length > 0) {
					for (let i in result[user][Arr]) {
						let temp = JSON.parse(JSON.stringify(result[user][Arr][i]));
						temp.UserID = JSON.parse(JSON.stringify(result[user]._id));
						data.push(temp);
					}
				}
			}
			BubbleSort(data);
			res.json(data);
		})
	} 
	else {
		User.find({ _id: req.session.userID }, function(err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				if (!!result[user][Arr] && result[user][Arr].length > 0) {
					for (let i in result[user][Arr]) {
						let temp = JSON.parse(JSON.stringify(result[user][Arr][i]));
						temp.UserID = JSON.parse(JSON.stringify(result[user]._id));
						data.push(temp);
					}
				}
			}
			BubbleSort(data);
			data.role = req.session.role;
			res.json(data);
		})
	}
}

module.exports = { ReadData };