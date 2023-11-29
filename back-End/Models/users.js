const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        minLength: 3,
        maxLength: 15,
        require: [true, "Username is required"],
    },

    firstName: {
        type: String,
        unique: true,

        require: [true, "Nom is required"],
    },

    phoneNumber : {
        type: String,
        unique: true,

        require: [true, "Telephone is required"],
    },

    lastName: {
        type: String,
        unique: true,

        require: [true, "Prenom is require"],
    },

    email: {
        type: String,
        unique: true,
        require: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"Invalide email address"],
    },

    town : {
        type: String,
        require: [true, "Ville is required"],
    },

    neighborhood : {
        type: String,
        require: [true, "Quartier is required"],
    },

    password: {
        type: String,
     },

    code: {
        type: String,
        require: false,
    },

    profilePicture: {
        type: String,
        require: false,
    },

    createdAt: {
        type: Date,
        require: false,
    },

    isDeleted: {
        type: Date,
        require: false,
    },

    isActive: {
        type: Boolean,
        require: true,
    },

    role: {
        type: String,
        require: true,
    }
});
module.exports = mongoose.model("Users",UserSchema);