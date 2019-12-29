const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

const DeleteData = (req, res) => {
    /*
    User.update({}, {$pull: { [req.body.storage]: { _id: req.body.id } } }, { multi: false }, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        else res.status(200).json({ ok : true });
    })

    */
    // res.status(200).json({ ok : true, res: req.body });
}

module.exports = { DeleteData };