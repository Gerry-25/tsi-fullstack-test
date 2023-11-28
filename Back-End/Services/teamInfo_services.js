const express = require('express');
const router = express.Router();
const TeamModel = require('../Models/team');
const PlayerModel = require('../Models/player');
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

router.get('/teamTotalPlayer',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.send({status:404,message: "Invalid Token"});
    }else {
    const allPlayer = await PlayerModel.find().exec();
    const number = allPlayer.length;
    res.send({status:200,number});
}
});

router.get('/teamSalary', verifyToken, async (req, res) => {
    try {
      if (!req.user) {
        res.status(404).json({ message: 'Invalid Token' });
      } else {
        const players = await PlayerModel.find().exec();
        if (!players || players.length === 0) {
          res.status(404).json({ message: 'No players found' });
          return;
        }  
        const totalSalary = players.reduce((sum, player) => sum + (player.salary || 0), 0);
        res.status(200).json({ totalSalary });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });

module.exports = router;