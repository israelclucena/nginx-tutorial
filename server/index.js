const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("I am the '/' endpoint")
})


app.listen(7777, ()=>{
    console.log('Server running on port 7777')
})