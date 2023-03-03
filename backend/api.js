const express=require('express');
const { checkauth, createUser, getfoodlist, getfooddetails, getbabysitterdetails, getbabysitteritem, uploadfood, getProfileDetails, updateProfilePicture, updateProfile, uploadProjects, getProjectlist } = require('./database');
const r=express.Router()
module.exports= r;

r.get('/profile',async(req,res)=>{
    let {id}=req.query;
    if(!id){
        res.json({status:'Failed to load'});
        return ;
    }
    let data=await getProfileDetails(id);
    if(data){
        res.json({status:'OK',data});
    }else{
        res.json({status:'Failed to get profile data.'})
    }
})
r.post('/login',async(req,res)=>{
    let {user,pass}=req.body;
    if(!user||!pass){
        res.json({status:"Failed to get data."})
        return ;
    }

    let data=await checkauth(user,pass);
    if(data){
        res.json({data,status:'OK'});
    }else{
        res.json({status:"Wrong email or password."});
    }

})
r.post('/signup',async(req,res)=>{
    let {email,pass,name,userType}=req.body;
    if(!email||!pass||!name||!userType){
        res.json({status:"Failed to get data."})
        return ;
    }

    let data=await createUser(name,email,pass,userType);
    if(data=='OK'){
        res.json({status:data,message:'You can now login with your data'});
    }else{
        res.json({status:data});
    }
})


   
r.post('/updateprofile',async(req,res)=>{

    const {cookie,data}=req.body;
    if(!cookie||!data){
        res.json({status:'Failed to load image!'});
        return;
    }
    let da=await updateProfile(data,cookie);
    if(da){
        res.json({status:'OK'})
    }else{
        res.json({status:'Failed to upload profile picture!'})
    }

})



    
r.post('/uploadproject',async (req,res)=>{
    let {title,details,requirements,pricerange,attachments,cookie}=req.body;
    if(!title||!requirements||!details||!attachments||!pricerange||!cookie){
        res.json({status:'Failed to work with you'});
        return ;
    
    }

    let data=await uploadProjects(title,details,requirements,pricerange,attachments,cookie);
    if(data){
        res.json({status:'OK'})
    }else{
        res.json({status:'Failed to upload project!'})
    }
    
})
    
r.get('/projectlist',async(req,res)=>{
    const {query}=req.query;
    let data=await getProjectlist(query);
    if(data){
        res.json({status:'OK',data})
    }else{
        res.json({status:'Failed to load projects!'})
    }
})
    


   

    
    