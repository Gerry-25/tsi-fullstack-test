const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PlayerInfoSchema = new Schema ({
    firstName : {
        type: String,
        require: true,
    },

    lastName : {
        type: String,
        require: true,
    },

    position : {
        type: String,
        require: true,
    },

    size : {
        type: String,
        require: true,
    },

    startContract : {
        type: String,
        require: true,
    },

    endContract : {
        type: String,
        require: true,
    },

    salary : {
        type: Number,
        require: true,
    },

    birthDate : {   
        type: String,
        require: true,
    }
});
module.exports = mongoose.model("PlayerInfo",PlayerInfoSchema);