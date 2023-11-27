const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const GameInfoSchema = new Schema ({
    opponent : {
        type: String,
        require: true,
    },

    winOrLose : {
        type: Boolean,
        require: true,
    },

    score : {
        type: String,
        require: true,
    },

    gameDate : {
        type: String,
        require: true,
    }
});
module.exports = mongoose.model("GameInfo",GameInfoSchema);