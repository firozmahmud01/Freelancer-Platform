const express=require('express');
const { checkauth, createUser, getfoodlist, getfooddetails, getbabysitterdetails, getbabysitteritem, uploadfood, getProfileDetails, updateProfilePicture, updateProfile, uploadProjects, getProjectlist, getProjectDetails, requestbit, acceptbidder, loadmessage, sendmessage } = require('./database');
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
    
r.post('/projectlist',async(req,res)=>{
    const {token}=req.body;
    let data=await getProjectlist(token);
    if(data){
        res.json({status:'OK',data})
    }else{
        res.json({status:'Failed to load projects!'})
    }
})
    

r.post('/projectdetails',async(req,res)=>{
    let {pid,cookie}=req.body;
    if(!pid||!cookie){
        res.json({status:'Failed to load for missing'})
        return ;
    }
    let data=await getProjectDetails(pid,cookie);
    if(data){
        res.json({status:'OK',data})
    }else{
        res.json({status:'Failed to load details'});
    }
})

r.post('/loadmsg',async(req,res)=>{
    const {projectid}=req.body;
    if(!projectid){
        res.json({status:'Failed to proccess'});
        return ;
    }
    let data=await loadmessage(projectid);
    if(data){
        res.json({status:'OK',data})
    }else{
        res.json({status:'Failed to load msg'});
    }
})

r.post('/sendmsg',async(req,res)=>{
    const {token,projectid,msg}=req.body;
    if(!token||!projectid||!msg){
        res.json({status:'Failed to proccess'});
        return ;
    }
    let data=await sendmessage(token,projectid,msg);
    if(data){
        res.json({status:'OK'})
    }else{
        res.json({status:'Failed to load msg'});
    }
})

r.post('/acceptbid',async(req,res)=>{
    const {token,projectid,bidderprofile}=req.body;
    if(!token||!projectid||!bidderprofile){
        res.json({status:'Failed to accept'});
        return ;

    }

    let data=await acceptbidder(token,projectid,bidderprofile);
    if(data){
        res.json({status:'OK'})
    }else{
        res.json({status:'Failed to accept you request'})
    }
})
    
    r.post('/bidrequest',async(req,res)=>{
        const {price,time,details,cookie,projectuid}=req.body;
        if(!price||!time||!details||!cookie||!projectuid){
            res.json({status:'Failed to request'})
            return ;
        }

        let data=await requestbit(price,time,details,projectuid,cookie);
        if(data){
            res.json({status:'OK'});
        }else{
            res.json({status:'Failed to add your bid!'});
        }
    })