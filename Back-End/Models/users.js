const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userRoles = ['ADMIN', 'OWNER', 'COACH'];

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        minLength: 3,
        maxLength: 15,
        require: [true, "Username is required"],
    },

    nom: {
        type: String,
        unique: true,

        require: [true, "Nom is required"],
    },

    telephone : {
        type: String,
        unique: true,

        require: [true, "Telephone is required"],
    },

    prenom: {
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

    ville : {
        type: String,
        require: [true, "Ville is required"],
    },

    quartier : {
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

    profil_picture: {
        type: String,
        require: false,
    },

    created_at: {
        type: Date,
        require: false,
    },

    is_deleted: {
        type: Date,
        require: false,
    },

    is_active: {
        type: Boolean,
        require: true,
    },

    role: {
        type: String,
        enum: userRoles,
        require: true,
    }
});
module.exports = mongoose.model("Users",UserSchema);