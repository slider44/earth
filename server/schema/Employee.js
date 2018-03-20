const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema ({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email:{type:String, require:false},
    contact:{type:String, require:false}

});

module.exports = mongoose.model('Employee', empSchema);