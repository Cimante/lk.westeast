const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

const DeleteData = (req, res) => {
    User.findByIdAndUpdate(
        req.body.userID, 
        {$pull: { [req.body.storage]: {_id: req.body.id} }},
        { safe: true, upsert: true },
        function(err, result) {
            if (err) throw err;
            res.json(result)
        }
    )
}

module.exports = { DeleteData };