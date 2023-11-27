const express = require('express');
const router = express.Router();
const PlayerModel = require('../Models/players');
const verifyToken = require('../Middlewares/middleware');

module.exports = router;