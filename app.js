require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('combined'));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello Worldsss!');
})
app.listen(3000)