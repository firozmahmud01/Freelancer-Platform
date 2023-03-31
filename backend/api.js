const express=require('express');
const { checkauth, createUser, getfoodlist, getfooddetails, getbabysitterdetails, getbabysitteritem, uploadfood, getProfileDetails, updateProfilePicture, updateProfile, uploadProjects, getProjectlist, getProjectDetails, requestbit, acceptbidder, loadmessage, sendmessage, submitreview, cashreq, loadb, videolist, uploadvideo, uploadlike, sendcomment, commentlist, loadnotification } = require('./database');
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

    r.post('/submitreview',async(req,res)=>{
        let {projectid,rating,comment,cookie}=req.body;
        if(!projectid||!rating||!comment||!cookie){
            res.json({status:'Failed to work'});
            return;
        }

let data=await submitreview(projectid,rating,comment,cookie)
if(data){
res.json({status:'OK'});
}else{
    res.json({status:'Failed to submit'});
}

    })



    r.post('/cashin',async(req,res)=>{
        let {amount,number,cookie}=req.body;
        if(!amount||!number||!cookie){
            res.json({status:"failed to work"});
            return ;
        }

        let data=await cashreq('cashin',amount,number,cookie);
if(data){
    res.json({status:"OK"});
}else{
    res.json({status:'Failed to upload because of invalid user!'})
}
        
    })
    



    r.post('/withdraw',async(req,res)=>{
        let {amount,number,cookie}=req.body;
        if(!amount||!number||!cookie){
            res.json({status:"failed to work"});
            return ;
        }

        let data=await cashreq('withdraw',amount,number,cookie);
if(data){
    res.json({status:"OK"});
}else{
    res.json({status:'Failed to upload because of invalid user!'})
}
        
    })



    r.post('/loadb',async(req,res)=>{
        let {cookie}=req.body
        if(!cookie){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await loadb(cookie);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'OK','data':0})
}
        
    })


    r.get('/videolist',async(req,res)=>{
        
        let data=await videolist();
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })




    r.post('/uploadvideo',async(req,res)=>{
        let {cookie,link}=req.body
        if(!cookie||!link){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await uploadvideo(cookie,link);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })






    r.post('/sendlike',async(req,res)=>{
        let {cookie,pid}=req.body
        if(!cookie||!pid){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await uploadlike(cookie,pid);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })




    r.post('/sendcomment',async(req,res)=>{
        let {cookie,pid,comment}=req.body
        if(!cookie||!pid||!comment){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await sendcomment(cookie,pid,comment);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })




    r.post('/loadcomment',async(req,res)=>{
        let {pid}=req.body
        if(!pid){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await commentlist(pid);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })








    r.post('/loadnotification',async(req,res)=>{
        let {cookie}=req.body
        if(!cookie){
            res.json({status:'Failed to work!'})
            return ;
        }


        let data=await loadnotification(cookie);
if(data){
    res.json({status:"OK",data});
}else{
    res.json({status:'Failed to load!'})
}
        
    })