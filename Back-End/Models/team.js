const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const TeamInfoSchema = new Schema ({
    label : {
        type: String,
        require: true,
    },

    owner : {
        type: String,
        require: true,
    },

    location : {
        type: String,
        require: true,
    },

    coach : {
        type: String,
        require: true,
    },

    created_at : {
        type: Date,
        require: true,
    }
});
module.exports = mongoose.model("TeamInfo",TeamInfoSchema);