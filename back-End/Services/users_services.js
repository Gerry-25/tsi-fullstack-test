const express = require('express')
const router = express.Router();
const UserModel = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const verifyToken = require('../Middlewares/middleware');
dotenv.config();

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'ggoubalan@gmail.com',
        pass: 'kbkfbuepmvlblioe',
    },
    secure: true,
});

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

router.put('/changeCred', verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(404).send({ message: "Invalide Token" });
    } else {
        const user = req.user.username;
        if (user && user.is_active == true) {
            if (user.is_deleted == null) {
                const { email, password } = req.body;
                if (email != null && password != null) {
                    const hash = await bcrypt.hash(password, 12);
                    const randomCode = generateRandomString(10);
                    await UserModel.findByIdAndUpdate(user.id, { email: email, password: hash, code: randomCode, is_active: false }).exec();
                    const mailData = {
                        from: 'ggoubalan@gmail.com',
                        to: email,
                        subject: 'Url activation compte avec le nouveau mail',
                        text: randomCode,
                        html: 'http://localhost:3005/auth/validateCompte/' + randomCode,
                    };
                    transporter.sendMail(mailData, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        res.status(200).send({ message: "Email change and password. Check your mail to validate your new account email", message_id: info.messageId });
                    });
                } else {
                    if (email == null && password != null) {
                        const hash = await bcrypt.hash(password, 12);
                        await UserModel.findByIdAndUpdate(user.id, { password: hash }).exec();
                        res.status(200).send({ message: "Password change" })
                    } else {
                        if (email != null && password == null) {
                            const randomCode = generateRandomString(10);
                            await UserModel.findByIdAndUpdate(user.id, { email: email, code: randomCode, is_active: false }).exec();
                            const mailData = {
                                from: 'ggoubalan@gmail.com',
                                to: email,
                                subject: 'Url activation compte avec le nouveau mail',
                                text: randomCode,
                                html: 'http://localhost:3005/auth/validateCompte/' + randomCode,
                            };

                            transporter.sendMail(mailData, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                res.status(200).send({ message: "Email change. Check your mail to validate your new account email", message_id: info.messageId });
                            });
                        } else {
                            res.status(404).send({ message: "Something gone wrong with the password!" });
                        };
                    };
                }
            } else {
                res.status(404).send({ message: "Compte deleted" });
            }
        } else {
            res.status(404).send({ message: "Compte not activated" });
        };
    };
});

router.put("/updateProfile",verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(404).send({ message: "Invalide token" });
    }
    else {
        const user = req.body;
        await UserModel.findByIdAndUpdate(req.user._id,{$set:req.body}).exec();
        res.status(200).send({ message: "Information about your profil", user });
    }
});

router.get('/MyProfil', verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(404).send({ message: "Invalide token" });
    }
    else {
        const user = req.user;
        res.status(200).send({ message: "Information about your profil", user });
    }
});

router.get('/emailForget/:email', async (req, res) => {
    const email = req.params.email;
    const user = await UserModel.findOne({ email: email }).exec();
    if (user) {
        const randomCode = generateRandomString(10);
        await UserModel.findByIdAndUpdate(user.id, { code: randomCode }).exec();
        const mailData = {
            from: 'ggoubalan@gmail.com',
            to: email,
            subject: 'Code de reinitialisation',
            text: randomCode,
            html: 'Votre code de reinitialisation est le suivant: ' + randomCode,
        };
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({ message: "Email send. Check your mail to know your new code", message_id: info.messageId });
        });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

router.put('/setNewPassword', async (req, res) => {
    const { code, new_password, confirm_new_password } = req.body;
    const user = await UserModel.findOne({ code: code }).exec();
    if (user) {
        if (new_password == confirm_new_password) {
            const hash = await bcrypt.hash(new_password, 12);
            const updateUser = await UserModel.findByIdAndUpdate(user.id, { password: hash }).exec();
            res.status(200).send({ message: "Password reset with success", updateUser })
        } else {
            res.status(400).send({ message: "Password not match" });
        }
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

router.get('/isConnected', verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(404).send({ message: "Invalid token" });
    } else {
        const username = req.user.username;
        const role = req.user.role;
        res.status(200).send({ message: "You are connected", username, role });
    }
});

router.get('/userRole', verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(404).send({ message: "Invalid token" });
    } else {
        const role = req.user.role;
        res.status(200).send({ message: "Your role", role });
    }
});

module.exports = router;