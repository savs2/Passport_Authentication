const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const { port, database, db_host } = require("./config/config");
const app = express();

const PassportLocal = require("passport-local");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user")
const authRouter = require("./controllers/auth")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );

next()
});
app.use(
    session({
      secret: "iDontKnowSecret",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(function (user, done) {
    // console.log("flow of control inside serialization ");
    done(null, user);
  });
  passport.deserializeUser(async function (user, done) {
    try{
      
      // console.log("flow of control inside deserialization");
      // console.log("trying to printer user in deserialization before update");
      // console.log(user);
      const{_id}= user;
      user = await User.findById(_id);
      
      // console.log("trying to printer user in deserialization after update");
      // console.log(user);
      done(null, user);
    
    }catch(err){
      done(err);
    }
  
  });   


app.use(authRouter)
// Database creation and connection
mongoose.connect(`${database}`)
        .then(() => {
            console.log('Database created and connected successfully!')
        })
        .catch((err) =>  console.log(err))
  
app.listen(port, () => {
          console.log(`serve at http://${db_host}:${port}`);
      });
  

