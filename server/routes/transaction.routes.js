const express = require('express');
const router = express.Router();

const Transaction = require('../schema/Transaction');

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

router.delete("/transactions/:userId",(req,res,next) => {
    console.log(req.params.userId);
    Transaction.deleteMany({userID:req.params.userId},(err, data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    })
});

router.delete("/transactions/deleteTransaction/:transId",(req,res,next) => {
    Transaction.deleteOne({_id:req.params.transId},(err,data)=>{
        if(err) return res.json(err)
        else return res.json(data)
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
});

router.get("/transactions/coinTransaction/:userId/:coin",(req, res,next) => {
    console.log(req.params.userId+" "+req.params.coin);

    Transaction.find({
        userID: req.params.userId,
        coin:req.params.coin
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

router.put("/transactions/:transId",(req,res,next)=>{
    Transaction.update({_id:req.params.transId},req.body,(err, rawData)=>{
        if(err) return res.json(err)
        else return res.json(rawData)
    });
});

module.exports = router;