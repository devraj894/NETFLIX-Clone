const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/signInlogIn")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const SignUpSchema=new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        unique : true,
        required : true,
    }
})

const collection=new mongoose.model("Collection1",SignUpSchema)

module.exports=collection