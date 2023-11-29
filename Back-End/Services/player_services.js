const express = require("express");
const router = express.Router();
const PlayerModel = require("../Models/players");
const verifyToken = require("../Middlewares/middleware");

router.post("/createPlayer", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const {
      firstName,
      lastName,
      position,
      size,
      startContract,
      endContract,
      salary,
      birthDate,
    } = req.body;
    const newPlayer = new PlayerModel({
      firstName,
      lastName,
      position,
      size,
      startContract,
      endContract,
      salary,
      birthDate,
    });
    await newPlayer.save();
    res.status(200).json({ message: "Player add successfully", newPlayer });
  }
});

router.get("/allPlayer", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const result = await PlayerModel.find().exec();
    res.status(200).json({ result });
  }
});

router.get("/totalPlayer", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const result = await PlayerModel.find().exec();
    const totalPlayer = result.length;
    res.status(200).json({ totalPlayer });
  }
});

router.put("/updatePlayerInfo/:playerId", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const playerId = req.params.playerId;
    const { position, size, startContract, endContract, salary } = req.body;
    const result = await PlayerModel.findByIdAndUpdate(playerId, {
      $set: req.body
    }).exec();
    res.send({ status: 200, result });
  }
});

router.get("/getPlayerInfo/:playerId", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const playerId = req.params.playerId;
    const result = await PlayerModel.findById(playerId).exec();
    res.send({ status: 200, result });
  }
});

router.delete("/deletePlayer/:playerId", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "Invalid Token" });
  } else {
    const playerId = req.params.playerId;
    await PlayerModel.findByIdAndDelete(playerId).exec();
    res.send({ status: 200, message: "Player deleted successfully" });
  }
});

module.exports = router;
