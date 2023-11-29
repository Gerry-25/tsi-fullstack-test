const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const StatSchema = new Schema ({
    playerId : {
        type: String,
        require: true,
    },

    gameId : {
        type: String,
        require: true,
    },

    game : {
        type: String,
    },

    player : {
        type: String,
    },

    minute : {
        type: Number,
        require: true,
    },

    points : {
        type: Number,
        require: true,
    },

    assists : {
        type: Number,
        require: true,
    },

    rebounds : {
        type: Number,
        require: true,
    },

    fouls : {
        type: Number,
        require: true,
    },

    freeThrowsMade : {
        type: Number,
        require: true,
    },

    freeThrowsAttempt : {
        type: Number,
        require: true,
    },

    fieldGoalMade : {
        type: Number,
        require: true,
    },

    fieldGoalAttempt : {
        type: Number,
        require: true,
    },

    threePointMade : {
        type: Number,
        require: true,
    },

    threePointAttempt : {
        type: Number,
        require: true,
    },

    interception : {
        type: Number,
        require: true,
    },

    block : {
        type: Number,
        require: true,
    },
});
module.exports = mongoose.model("Stat",StatSchema);