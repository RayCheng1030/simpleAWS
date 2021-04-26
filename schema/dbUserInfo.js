const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userInfoSchema = new Schema({
    userName: {
        type: String,
        required: true //代表是否必填
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    localTime: {
        type: String,
        default: Date().toLocaleString(),
        required: false
    }
}, {timestamps: false});

console.log();


//model('UserInfo',userInfoSchema); UserInfo = 現有mongoDB 集成名 DBTest > UserInfo
const UserInfo = mongoose.model('MyUserInfos', userInfoSchema);
module.exports = UserInfo;