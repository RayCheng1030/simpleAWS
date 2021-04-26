const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to my home page</h1>");
});

let port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("webServer is running at ",port);
});