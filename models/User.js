const { string } = require('joi');
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema( {
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        required:true
    },
    cart : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userSchema);
module.exports = User;