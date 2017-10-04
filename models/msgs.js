var mongoose = require('mongoose');

//Schema
var msgSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Msg = module.exports = mongoose.model('Msg', msgSchema);

//Get Msgs
module.exports.getMsgs = function (callback, limit) {
    Msg.find(callback).limit(limit);
}

//Get Msg
module.exports.getMsgById = function (id, callback) {
    Msg.findById(id, callback);
}

//Add Msg
module.exports.addMsg = function (msg, callback) {
    Msg.create(msg, callback);
}

//Update Msg
module.exports.updateMsg = function (id, msg, options, callback) {
    var query = { _id: id };
    var update = {
        from: msg.from
    };
    Msg.findOneAndUpdate(query, update, options, callback);
}