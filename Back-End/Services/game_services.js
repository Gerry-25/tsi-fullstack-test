const express = require('express');
const router = express.Router();
const GameModel = require('../Models/game');
const verifyToken = require('../Middlewares/middleware');

router.post('/createGame',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
        const {opponent, winOrLose, score, gameDate} = req.body;
        const newGame = new GameModel({
            opponent,
            winOrLose,
            score,
            gameDate
        });
        await newGame.save();
        res.status(200).json({status:200,message: "Game created successfully",newGame});
}
});

router.get('/allGame',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().exec();
    res.status(200).json({result});
}
});

router.get('/totalGame',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().exec();
    const totalGame = result.length;
    res.status(200).json({totalGame});
}
});

router.get('/allGameWin',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().where({winOrLose: true}).exec();
    res.status(200).json({result});
}
});

router.get('/totalGameWin',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().where({winOrLose: true}).exec();
    const totalGameWin = result.length;
    res.status(200).json({totalGameWin});
}
});

router.get('/allGameLose',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().where({winOrLose: false}).exec();
    res.status(200).json({status:200,result});
}
});

router.get('/totalGameLoose',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const result = await GameModel.find().where({winOrLose: false}).exec();
    const totalGameLoose = result.length;
    res.status(200).json({totalGameLoose});
}
});

router.put('/updateGame/:gameId',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
        const gameId = req.params.gameId;
        const {winOrLose, score} = req.body
    const result = await GameModel.findByIdAndUpdate(gameId,{$set:req.body}).exec();
    res.status(200).json({status:200,result});
}
});

router.get('/getGameInfo/:gameId',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
    const gameId = req.params.gameId;
    const result = await GameModel.findById(gameId).exec();
    res.status(200).json({status:200,result});
}
});

router.delete('/deleteGame/:gameId',verifyToken,async(req,res)=>{
    if(!req.user)
    {
        res.status(404).json({status:404,message: "Invalid Token"});
    }else {
        const gameId = req.params.gameId;
        await GameModel.findByIdAndDelete(gameId).exec();
    res.status(200).json({status:200,message:"Game deleted successfully"});
}
});

module.exports = router;