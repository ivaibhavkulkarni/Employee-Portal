const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const UserList = mongoose.model('UserList',userSchema);

module.exports = UserList;