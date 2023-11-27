const express = require('express');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const app = express();
const session = require ("express-session");
const MongoDBSession = require ('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./Services/auth');
const userRoute = require('./Services/users_services');
const teamInfoRoute = require('./Services/teamInfo_services');
const statRoute = require('./Services/stat_services');
const playerRoute = require('./Services/player_services');
const gameRoute = require('./Services/game_services');


const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection: "mySession",
});

app.use(
    cors({
        methods:"GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(session({
    secret: 'Key that will be sign',
    resave: false,
    saveUninitialized: false,
    store: store,
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT, function () {
    const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
              "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "LogRocket",
              url: "https://logrocket.com",
              email: "info@email.com",
            },
          },
          servers: [
            {
              url: "http://localhost:3005",
            },
          ],
        },
        apis: ['./Services/*.js'],
      };
      
      const specs = swaggerJsdoc(options);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
      );
  console.log('listening on 3005')
})

try {
    mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true});
    console.log("connect to db");
} catch (error) {
    handleError(error);
};
app.use(bodyParser.json());
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/stat',statRoute);
app.use('/game',gameRoute);
app.use('/teams',teamInfoRoute);