const express = require('express');
const router = express.Router();
const TeamModel = require('../Models/team');
const verifyToken = require('../Middlewares/middleware');

router.post('/createTeamProfil',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.send({status:404,message: "Invalid Token"});
    }else {
        const {label, owner, location, coach} = req.body;
        const newTeamInfo = new TeamModel({
            label,
            owner,
            location,
            coach,
            createdAt: new Date()
        });
        await newTeamInfo.save();
        res.send({status:200,message: "Team informations add successfully",newTeamInfo});
}
});

router.put('/updateTeam/:teamId',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.send({status:404,message: "Invalid Token"});
    }else {
        const gameId = req.params.gameId;
        const {label, owner, location, coach} = req.body
    const result = await TeamModel.findByIdAndUpdate(gameId,{$set:req.body}).exec();
    res.send({status:200,message:"Information update with success",result});
}
});


router.get('/teamInfo/:teamId',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.send({status:404,message: "Invalid Token"});
    }else {
    const teamId = req.params.teamId;
    const result = await TeamModel.findById(teamId).exec();
    res.send({status:200,result});
}
});

module.exports = router;