const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        // required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    dob:{
        type:Date,
        required: true        
    },
    role:{
        type:String,
        required:true
    },
    appointments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Appointments'
        }
    ]
},{
    timestamps:true
});

const User = mongoose.model('Users',userSchema);

module.exports = User;