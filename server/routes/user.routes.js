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

const _leaveListProjection = 'leaveType startDatetime endDatetime viewPublic';

// GET list of leaves starting in the future
router.get('/leaves', (req, res) => {
    Event.find({viewPublic: true, startDatetime: { $gte: new Date() }}, _leaveListProjection, (err, leaves) => {
      let leavesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (leaves) {
            leaves.forEach(event => {
           leavesArr.push(leave);
        });
      }
      res.send(leavesArr);
    });
});



module.exports = router;