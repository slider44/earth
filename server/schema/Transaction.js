const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema ({
    coin:{type:String, require:true},
    type_trans:{type:String, require:true},
    price:{type:Number, require:true},
    qty:{type:Number, require: true},
    time_stamp:{type:Date, require: true},
    userID:{type:String, require:true}
});

module.exports = mongoose.model('Transaction', transactionSchema);