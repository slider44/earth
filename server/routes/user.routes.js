const express = require('express');
const router = express.Router();


const User = require('../schema/Employee');
const Leave = require('../schema/Leave');
const Transaction = require('../schema/Transaction');

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

router.post("/users/:firstName",(req, res, next)=> {
    
    User.find([{first_name:req.params.first_name}],(err, data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    });

});

});



// GET leave by leave ID
router.get('/leaves/:_id', (req, res) => {
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


router.post("/transactions",(req,res,next)=>{
    //console.log("Server > POST '/transactions' ", req.body);
    delete req.body._id
    Transaction.create(req.body,(err,transaction)=>{
        if(err)
        {
            console.log(err);
            return res.json(err)
        } 
        else{
            console.log(res);
            return res.json(transaction)   
        }
    });
});

router.get("/transactions/:userId", (req, res, next) => {
    
    Transaction.find({
        userID: req.params.userId
    }, (err, transaction)=>{

        if(err) {
            res.json(err);
        }
        else {
            return res.json(transaction);
            console.log(res.json(transaction));
        }
    });
});

router.get("/transactions/count/:userId",(req, res,next) => {
    Transaction.aggregate([
        {
            $match:{
                userID:req.params.userId
            }
        },{
            $group:{
                _id:"$coin",
                qty:{$sum:"$qty"}
            }
        },
    ], function (err, trans) {
        let transArr = [];
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if (trans) {
            trans.forEach(leave => {
                transArr.push(leave);
            });
        }
        res.send(transArr);
     });
})

module.exports = router;