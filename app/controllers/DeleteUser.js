const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

const DeleteUser = (req, res) => {
    if (req.session.role === 'admin') {
        User.findOneAndRemove({ _id: req.body.id }, (err, result) => {
            if (err) {
                res.status(500).json({response: err});
            } else {
                res.status(200).json({});
            }
        })
    } else {
        res.status(403).json({ response: 'Доступ запрещён' });
    }
}

module.exports = { DeleteUser }