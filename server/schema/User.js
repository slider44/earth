const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema ({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    email:{type:String, require:true},
    editable:{type:Boolean, require: true}

});

module.exports = mongoose.model('User', EmpSchema);