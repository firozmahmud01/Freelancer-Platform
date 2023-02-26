const express=require('express');
const { checkauth, createUser, getfoodlist, getfooddetails, getbabysitterdetails, getbabysitteritem, uploadfood, getProfileDetails } = require('./database');
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


    r.get('/foodlist',async(req,res)=>{
        let {start,end}=req.query
        if(!start||!end){
            res.json({status:'Something is missing'})
            return 
        }
        let data=await getfoodlist(start,end)
        if(data){
            res.json({status:"OK",data})
        }else{
            res.json({status:'No product found!!!'})
        }
        
    })

    r.get('/productdetails',async(req,res)=>{
        let {id}=req.query
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }

        let data=await getfooddetails(id);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No product found with this id!!!'})
        }

        
    })

    r.get('/babysitteritem',async(req,res)=>{
        let {start,end}=req.query
        if(!start||!end){
            res.json({status:'Something is missing'})
            return 
        }
        let data=await getbabysitteritem(start,end);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No babysitter found for now'})
        }
        
    })

    r.get('/babysitterdetails',async(req,res)=>{
        let {id}=req.query
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }


        let data=await getbabysitterdetails(id);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No babysitter found with this id!!!'})
        }

        
    })


    r.get('/search',async(req,res)=>{
        let {q}=req.query
        if(!q){
            res.json({status:'Something is missing'})
            return 
        }

        
    })

    r.post('/addreview',async(req,res)=>{
        let {star,comment,reviewertoken}=req.body
        if(!star||!comment||!reviewertoken){
            res.json({status:'Something is missing'})
            return 
        }
        res.json({status:"OK"})
        
    })
    r.post('/uploadfood',async(req,res)=>{
        let {name,img,prize,brand,pointmsg,details,username,password}=req.body
        if(!name||!img||!prize||!brand||!pointmsg||!details||!username||!password){
            res.json({status:'You missied something'})
            return 
        }
        if(username=='admin'&&password=='admin'){

        let data=await uploadfood(name,img,prize,brand,pointmsg,details)
        if(data){
            res.json({status:'OK'})
        }else{
            res.json({status:'Failed to upload'})
        }
    }else{
        res.json({status:'Wrong username or password'})
    }

    })