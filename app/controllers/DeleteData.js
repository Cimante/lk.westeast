const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

const DeleteData = (req, res) => {
    User.update({Role: 'user'}, {$pull: {[req.body.storage] : { _id: req.body.id }}}, function(err, result) {
        if (err) throw err;
        res.status(200).json({msg: result});
    });
}

module.exports = { DeleteData };