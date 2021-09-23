const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport_mongoose = require('passport-local-mongoose');


const Usershema = new Schema(
{
    firstname:
    {
         type:String,
         required:true
    }
    ,
    lastname:
    {
        type:String,
        required:true
    },
    age:{
       type:Date,
       default:Date.now()
    }
},{timestamps:true});

mongoose.plugin(passport_mongoose);

module.exports= mongoose.model('user',Usershema);