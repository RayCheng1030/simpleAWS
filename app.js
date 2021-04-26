// npm init
// npm install express --save
// npm install express morgan

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbUrl = "mongodb+srv://rainmaker96:azsx1234@cluster0.kyjqk.mongodb.net/DbTest?retryWrites=true&w=majority";
const UserInfo = require('./schema/dbUserInfo');

mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log(`Connect to MongoDB : ${result}`);
        let port = process.env.port || 3000;
        app.listen(port, () => {
            console.log(`Web Server start running at ${port}`);
        });
    })
    .catch((err) => console.log(err))

app.get('/',(req,res)=>{
    res.send("Welcome to my first website on AWS")
});


//寫入(單一)資料資料，根據模組架構
app.get('/setUserInfo', (req, res) => {
    let userNameFromUrl = req.query.name; // 取得GET參數 http://www.ggyy.com/setUserInfo?name=ray
    console.log("userNameFromUrl = ",userNameFromUrl)
    if (userNameFromUrl === undefined) userNameFromUrl = "guest_" + new Date().getMilliseconds();
    const createUserInfo = {
        userName: userNameFromUrl,
        address: "TW",
        age: 39
    };
    UserInfo.create(createUserInfo)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


// 文檔新增有三種方法，一種是使用上面介紹過的文檔的save()方法，另一種是使用模型model的create()方法，最後一種是模型model的insertMany()方法
// .save（）是模型的實例方法，而.create（）是直接從模型中作為方法調用而調用的，本質上是靜態的，並且將對像作為第一個參數。
app.get('/create', (req, res) => {
    const createUserInfo1 = {
        userName: "CreateNewUserInfo1",
        address: "TW",
        age: 39
    };
    const createUserInfo2 = {
        userName: "CreateNewUserInfo2",
        address: "TW",
        age: 39
    };
    UserInfo.create(createUserInfo1, createUserInfo2)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// insertMany
app.get('/inserMany', (req, res) => {
    let aryUserInfo = [{
            userName: "inserMany1",
            address: "TW",
            age: 39
        },{
            userName: "inserMany2",
            address: "TW",
            age: 39
        },{
            userName: "inserMany3",
            address: "TW",
            age: 39
        }
    ];
    UserInfo.insertMany(aryUserInfo)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//更新(單一)資料資料
app.get('/updateOnce', (req, res) => {
    UserInfo.updateOne({
            userName: {
                $gte: "ABCD"
            }
        }, //搜索條件
        {
            userName: "ABCD222"
        }, //更新內容
        function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log("Updated Docs : ", docs);
                res.redirect('/getAllUsers');
            }
        });
});

//更新(全部)資料資料
app.get('/update', (req, res) => {
    UserInfo.updateOne({
            userName: {
                $gte: "ABCD"
            }
        }, //搜索條件
        {
            userName: "ABCD222"
        }, //更新內容
        function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log("Updated Docs : ", docs);
                res.redirect('/getAllUsers');
            }
        });
})

//讀取 (全部) 資料 注意UserInfo不需要再new()
app.get('/getAllUsers', (req, res) => {
    UserInfo.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//讀取 (單一) 資料 注意UserInfo不需要再new()
app.get('/getUserById', (req, res) => {
    UserInfo.findById('60806eb904205973e07896af')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})