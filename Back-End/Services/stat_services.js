const express = require('express');
const router = express.Router();
const StatModel = require('../Models/stat');
const PlayerModel = require('../Models/players');
const GameModel = require('../Models/game');
const verifyToken = require('../Middlewares/middleware');

router.post('/addStat',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({message: "Invalid Token"});
    }else {
        const {
            playerId,
        
            gameId,
        
            minute,
        
            points,
        
            assists,
        
            rebounds,
        
            fouls,
        
            freeThrowsMade,
        
            freeThrowsAttempt,
        
            fieldGoalMade,
        
            fieldGoalAttempt,
        
            threePointMade,
        
            threePointAttempt,
        
            interception,
        
            block
        } = req.body;
        const playerVerify = await PlayerModel.findById(req.body.playerId).exec();
        const gameVerify = await GameModel.findById(req.body.gameId).exec();

        if(!playerVerify)
        {
            res.status(404).json({message: "Player not found"});
        }
        if(!gameVerify)
        {
            res.status(404).json({message: "Game not found"});
        }
        const newStat = new StatModel({
            playerId,
        
            gameId,

            game: gameVerify.opponent,

            player: playerVerify.lastName+" " +playerVerify.firstName,
        
            minute,
        
            points,
        
            assists,
        
            rebounds,
        
            fouls,
        
            freeThrowsMade,
        
            freeThrowsAttempt,
        
            fieldGoalMade,
        
            fieldGoalAttempt,
        
            threePointMade,
        
            threePointAttempt,
        
            interception,
        
            block
        });
        await newStat.save();
        res.status(200).json({message: "Player stat add successfully",newStat});
}
});

router.get('/getPlayerAverage/:playerId',verifyToken,async(req,res)=>{
    try {
      if (!req.user) {
        res.status(404).json({ status: 404, message: 'Invalid Token' });
      } else {
        const playerId = req.params.playerId;
        const statList = await StatModel.find({ playerId }).exec();
  
        const size = statList.length;
  
        if (size === 0) {
          res.status(404).json({ status: 404, message: 'Player not found or no stats available' });
          return;
        }
  
        const sumStats = statList.reduce((accumulator, stat) => {
          for (const key in accumulator) {
            if (accumulator.hasOwnProperty(key)) {
              accumulator[key] += stat[key] || 0;
            }
          }
          return accumulator;
        }, { minute: 0, points: 0, assists: 0, rebounds: 0, fouls: 0, freeThrowsMade: 0, freeThrowsAttempt: 0, fieldGoalMade: 0, fieldGoalAttempt: 0, threePointMade: 0, threePointAttempt: 0, interception: 0, block: 0 });
  
        const average = {};
        for (const key in sumStats) {
          if (sumStats.hasOwnProperty(key)) {
            average[key] = sumStats[key] / size;
          }
        }
  
        res.status(200).json({ average });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });

  router.get('/getPlayerAverage', verifyToken, async (req, res) => {
    try {
      if (!req.user) {
        res.status(404).json({ status: 404, message: 'Invalid Token' });
      } else {
        const playerList = await PlayerModel.find().exec();
        const playerAverages = [];
  
        for (const player of playerList) {
          const statList = await StatModel.find({ playerId: player._id }).exec();
  
          const size = statList.length;
  
          if (size === 0) {
            // Skip players without stats
            continue;
          }
  
          const sumStats = statList.reduce((accumulator, stat) => {
            for (const key in accumulator) {
              if (accumulator.hasOwnProperty(key)) {
                accumulator[key] += stat[key] || 0;
              }
            }
            return accumulator;
          }, {
            minute: 0,
            points: 0,
            assists: 0,
            rebounds: 0,
            fouls: 0,
            freeThrowsMade: 0,
            freeThrowsAttempt: 0,
            fieldGoalMade: 0,
            fieldGoalAttempt: 0,
            threePointMade: 0,
            threePointAttempt: 0,
            interception: 0,
            block: 0,
          });
  
          const average = {};
          for (const key in sumStats) {
            if (sumStats.hasOwnProperty(key)) {
              average[key] = sumStats[key] / size;
            }
          }
  
          playerAverages.push({ playerName: player.lastName+" "+player.firstName, average });
        }
  
        res.status(200).json({ playerAverages });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  });
  

  router.get('/totalStat',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({message: "Invalid Token"});
    }else {
    const result = await StatModel.find().exec();
    const totalStat = result.length;
    res.status(200).json({totalStat});
}
});

router.get('/allStat',verifyToken,async(req,res)=>{
  if(!req.user)
  {
      res.status(404).json({message: "Invalid Token"});
  }else {
  const result = await StatModel.find().exec();
  res.status(200).json({result});
}
});

router.get('/findStat/:statId',verifyToken,async(req,res)=>{
  if(!req.user)
  {
      res.status(404).json({message: "Invalid Token"});
  }else {
    const statId = req.params.statId;
  const result = await StatModel.findById(statId).exec();
  res.status(200).json({result});
}
});

router.put('/updateStat/:statId',verifyToken,async(req,res)=>{
  if(!req.user)
  {
      res.status(404).json({message: "Invalid Token"});
  }else {
    const statId = req.params.statId;
    const {
      minute,
  
      points,
  
      assists,
  
      rebounds,
  
      fouls,
  
      freeThrowsMade,
  
      freeThrowsAttempt,
  
      fieldGoalMade,
  
      fieldGoalAttempt,
  
      threePointMade,
  
      threePointAttempt,
  
      interception,
  
      block
  } = req.body;
  const result = await StatModel.findByIdAndUpdate(statId,{$set:req.body}).exec();
  res.status(200).json({result});
}
});


router.delete('/deleteStat/:statId',verifyToken,async(req,res)=>{
  if(!req.user)
  {
      res.status(404).json({message: "Invalid Token"});
  }else {
    const statId = req.params.statId;
  await StatModel.findByIdAndDelete(statId).exec();
  res.status(200).json({message: "Delete successfully"});
}
});
module.exports = router;