// server/models/Leave.js
/*
 |--------------------------------------
 | Leave Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema ({

    leaveType :  {type: String, required: true},
    startDatetime: { type: Date, required: true },
    endDatetime: { type: Date, required: true },
    description: String,
    viewPublic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Leave', leaveSchema);
