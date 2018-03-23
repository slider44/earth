const MONGO_URI = 'mongodb://db:password@ds245548.mlab.com:45548/mean-crypto'
const mongoose = require('mongoose');

const assert = require('assert');
const Employee = require('../../../../server/schema/Employee');

//Describe test
describe ('Nesting records', function() {

    //create tests
    it('Create an employee', function(done) {
        var newEmp = new Employee({
            lastName: 'COCOY',
            firstName: 'JEROME',
            email: 'cocoy@gmail.com',
            contact: '0928',
            leave:({
                leaveType: 'Vacation Leave',
                startDatetime : ISODate("2018-05-05T06:00:00.000+08:00"),
                endDatetime : ISODate("2018-05-05T08:00:00.000+08:00"),
                viewPublic : true})
        });
    });

})