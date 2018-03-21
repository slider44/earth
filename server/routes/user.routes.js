const express = require('express');
const router = express.Router();


const User = require('../schema/Employee');
const Leave = require('../schema/Leave');

router.get("/users", (req, res, next) => {
    
    User.find({}, (err, users)=>{

        if(err) {
            res.json(err);
        }
        else {
            return res.json(users);
            console.log(res.json(users));
        }
    });
});


router.post("/users",(req,res,next)=>{
    console.log("Server > POST '/users' ", req.body);
    delete req.body._id
    User.create(req.body,(err,user)=>{
        if(err) return res.json(err)
        else return res.json(user)
    });
});


router.delete("/users/:id",(req,res,next) => {
    console.log(req.params.id);
    User.deleteOne({_id:req.params.id},(err, data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    });
});

router.put("/users/:id",(req,res,next)=>{
    User.update({_id:req.params.id},req.body,(err, rawData)=>{
        if(err) return res.json(err)
        else return res.json(rawData)
    });
});

const _leaveListProjection = 'employeeId leaveType startDatetime endDatetime viewPublic';

// GET list of leaves starting in the future
router.get('/leaves', (req, res) => {
    User.aggregate([
        {
           $lookup: {
              from: "leaves",
              localField: "_id",    // common field from collection 1
              foreignField: "employeeID",  // common field from collection 2
              as: "LeaveDetails" // alias for collection 2
           }
        },
        { $unwind: "$LeaveDetails"},
        /*{
           $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromEmployees", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { fromEmployees: 0 } }*/
     ], function (err, leaves) {
        let leavesArr = [];
        if (err) {
            return res.status(500).send({message: err.message});
          }
          if (leaves) {
            leaves.forEach(leave => {
            leavesArr.push(leave);
        });
      }
      res.send(leavesArr);
     });


  
    /*Leave.find({viewPublic: true, startDatetime: { $gte: new Date() }}, _leaveListProjection, (err, leaves) => {
      let leavesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (leaves) {
            leaves.forEach(leave => {
            leavesArr.push(leave);
        });
      }
      res.send(leavesArr);
    });*/
});

/*router.get('/leaves', (req, res) => {
  
    Leave.find({viewPublic: true, startDatetime: { $gte: new Date() }}, _leaveListProjection, (err, leaves) => {
      let leavesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (leaves) {
            leaves.forEach(leave => {
            leavesArr.push(leave);
        });
      }
      res.send(leavesArr);
    });
});*/

// GET leave by leave ID
router.get('/leaves/:id', (req, res) => {
    Leave.findById(req.params.id, (err, leave) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!leave) {
        return res.status(400).send({message: 'Leave not found.'});
      }
      res.send(leave);
    });
  });



module.exports = router;