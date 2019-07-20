var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    maxVideoId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', schema);