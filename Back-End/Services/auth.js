const express = require ('express');
const router = express.Router();
const UserModel = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '70000s' });
};

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

router.get('/validateCompte/:code',async(req,res) => {
  const code = req.params.code;
  const account = await UserModel.findOne({ code: code});
  if(account){
    account.isActive = true;
    await account.save();
    res.send({status:200, message:"Compte activate with success"});
  } else {
    res.send({status:400,message:"Account not found !"});
  }
});

router.post('/register',async(req,res) => {
  const {username, firstName , lastName , phoneNumber, town, neighborhood,email, password, confirmPassword, role} = req.body;
  const oldUser = await UserModel.findOne({email: email}).exec();
  if(oldUser)
  {
    res.send({status:404, message:"Email already in use !"});
  } else {
    const randomCode = await generateRandomString(10);
    if(password == confirmPassword)
    {
      const hash_pass = await bcrypt.hash(password,12);
    //  console.log (hash_pass);
      newUser = new UserModel({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hash_pass,
        phoneNumber: phoneNumber,
        town: town,
        neighborhood: neighborhood,
        role: role,
        code: randomCode,
     // profil_picture: `${__dirname}/photos/${UFileName}`,
        createdAt: new Date(),
        isDeleted: null,
        isActive: false,
      });
      await newUser.save();
      const mailData = {
        from: 'TSI-PlayerManagement',
        to: email,
        subject: 'Url for activating your account',
        text: randomCode,
        html: 'http://localhost:3005/auth/validateCompte/' + randomCode,
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send({status:200, message: "Compte create.Check your mail to validate your new account"});
    });
    } else {
      res.send({status:404, message:"Password not match !"});
    };
  }
});


router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email}).exec();
    if (!user) {
        res.send({status:404 ,message: "User not found"});
    }    
    if (user){
      if (user.isActive == false) {
        res.send({status: 404,message: "User not activate"});
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.send({status:404, message: "Bad credential"});
    } else {
  const token = generateAccessToken({id: user.id},{username: user.username});
    res.send({status:200,message: "Login with succes",token, user});
        }
      }
    }
});

router.get('/logout',(req, res)=>{
        req.user = null;
        res.send({status:200,message: "Deconnect with success"});
});

module.exports = router;