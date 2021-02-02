const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()

app.listen(port, ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/car-service',
    {useNewUrlParser: true,useUnifiedTopology: true }
     )
    .then(()=>{
        console.log('connect to server and database ', port);
    })
    .catch(error=>{
        console.log(error);
    })
})

