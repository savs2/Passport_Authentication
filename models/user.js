const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');
const dotenv = require('dotenv');
dotenv.config();


const UserSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
  
    contactNo:{
        type:Number
    },
    role: {
        type: Boolean
    },
    create_at:{
        type: String,
        default: new Date()
    }
})

UserSchema.plugin(PassportLocalMongoose);
const User = new mongoose.model('User',UserSchema);
module.exports = User;