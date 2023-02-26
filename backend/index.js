const express=require('express');
const { checkauth } = require('./database');
const AllApi =require('./api')
const cors=require('cors');
const app=express();
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use('/images',express.static('images'))





app.use('/api',AllApi);
app.listen(4000);

