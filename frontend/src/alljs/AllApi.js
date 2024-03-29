const { productitem, productdetails, reviewitem, babysitteritem, babysitterdetails } = require("./ClassList")

const fakeimage='http://admission.bauet.ac.bd/img/logo.png'

let hostname='http://localhost:4000'
exports.hostname=hostname;






exports.loginuser=async(user,pass)=>{
    if(!user||!pass){
        alert('Username or password is missing')
        return ;
    }
    let res=await fetch(hostname+'/api/login',{ method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user,pass}),
      })
      let d=await res.json();
      if(d.status=='OK'){
        localStorage.setItem('cookie',d.data.cookie);
        localStorage.setItem('img',d.data.img);
        localStorage.setItem('name',d.data.name);
        localStorage.setItem('balance',d.data.balance);
        localStorage.setItem('userType',d.data.userType);
        localStorage.setItem('profile',d.data.profile);
        alert('You can do whatever you want '+d.data.name+'!');
        document.location.reload();
      }else{
        alert(d.status);
      }
}


exports.signupuser=async(name,email,pass,userType)=>{
    let r=await fetch(hostname+'/api/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name,email,pass,userType}),
    })
    let res=await r.json();
    if(res.status=='OK'){
        alert('Thank you for signup.You can now login!');
        document.location.reload();
    }else{
        alert(res.status);
    }

}

    exports.getprojectlist=async(query)=>{
        let res=await fetch(hostname+'/api/projectlist',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query!='myproject'?'':JSON.stringify({token:localStorage.getItem('cookie')}),
        })
        let da=await res.json();
        if(da.status=='OK'){
            return da.data;
        }else{
            alert(da.status);
        }
    }


    exports.getprofiledetails=async(link)=>{
        let res=await fetch(hostname+'/api/profile?id='+link);
        let data=await res.json()
        if(data.status=='OK'){
            return data.data;
        }else{

            alert(data.status);
            return undefined;
        }

    }


    exports.updateprofiledetails=async(updatedata)=>{
        let res=await fetch(hostname+'/api/updateprofile',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data:updatedata,cookie:localStorage.getItem('cookie')}),
        })
        let data=await res.json();
        if(data.status=='OK'){
            alert("Updated successfully!")
            document.location.reload();
        }else{
            alert(data.status);
        }
    }


   

    


    exports.getprojectdetails=async(projectid)=>{
        let res=await fetch(hostname+'/api/projectdetails',{ method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'pid':projectid,'cookie':localStorage.getItem('cookie')})
      })
      let data=await res.json();
      if(data.status=='OK'){
        return data.data;
      }else{
        alert(data.status);
      }

    }


    exports.uploadproject=async(title,requirements,details,pricerange,attachments)=>{
        let res=await fetch (hostname+'/api/uploadproject',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title,details,requirements,pricerange,attachments,cookie:localStorage.getItem('cookie')}),
        })
        let data=await res.json();
        if(data.status=='OK'){
            alert('Your project is successfully uploaded!');
            document.location.reload();
        }else{
            alert(data.status);
        }
    }

exports.loadmsg=async(projectid)=>{
    let res=await fetch(hostname+'/api/loadmsg',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({projectid}),
    })
    let da=await res.json();
        if(da.status=='OK'){
            return da.data;
        }else{
            alert(da.status);
        }
}


exports.sendmsg=async(projectid,msg)=>{
    let res=await fetch(hostname+'/api/sendmsg',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({projectid,msg,token:localStorage.getItem('cookie')}),
    })
    let da=await res.json();
        if(da.status=='OK'){
            return da.data;
        }else{
            alert(da.status);
        }
}
    exports.acceptbidrequest=async(projectid,bidderprofile)=>{
        
        let res=await fetch(hostname+'/api/acceptbid',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token:localStorage.getItem('cookie'),projectid,bidderprofile}),
        })
        let da=await res.json();
        if(da.status=='OK'){
            document.location.reload();
        }else{
            alert(da.status);
        }
    }

    

    exports.bidrequest=async(price,time,details,projectuid)=>{
        let res=await fetch(hostname+'/api/bidrequest',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({price,time,details,'cookie':localStorage.getItem('cookie'),projectuid}),
        })
        let da=await res.json();
        if(da.status=='OK'){
            alert("Your bid request is successfully submitted!")
            document.location='/'
        }else{
            alert(da.status);
        }


    }


    exports.submitreview=async(projectid,rating,comment)=>{
        let res=await fetch(hostname+'/api/submitreview',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({projectid,rating,comment,'cookie':localStorage.getItem('cookie')}),
        })
        let da=await res.json();
        if(da.status=='OK'){
            alert('Thank you for your valuable review')
            document.location='/'
        }else{
            alert(da.status);
        }
    }

   exports.cashin=async(amount,number)=>{
    let res=await fetch(hostname+'/api/cashin',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({amount,number,'cookie':localStorage.getItem('cookie')}),
    })
    let da=await res.json();
        if(da.status=='OK'){
            alert('We will soon let you know!')
            document.location='/'
        }else{
            alert(da.status);
        }
   }
   exports.withdraw=async(amount,number)=>{
    let res=await fetch(hostname+'/api/withdraw',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({amount,number,'cookie':localStorage.getItem('cookie')}),
    })
    let da=await res.json();
        if(da.status=='OK'){
            alert('We will soon let you know!')
            document.location='/'
        }else{
            alert(da.status);
        }
   }
    exports.loadbalence=async()=>{
        let res=await fetch(hostname+'/api/loadb',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'cookie':localStorage.getItem('cookie')}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                return da.data;
            }
    }

    exports.videolist=async()=>{
        let res=await fetch(hostname+'/api/videolist')
        let da=await res.json();
            if(da.status=='OK'){
                return da.data;
            }
    }

    exports.uploadvideo=async(link)=>{
        let res=await fetch(hostname+'/api/uploadvideo',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({link,'cookie':localStorage.getItem('cookie')}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                alert("Thank you for upload this video")
                document.location.reload();
            }else{
                alert(da.status);
            }
    }


    exports.sendlike=async(pid)=>{
        if(!localStorage.getItem('cookie')){
            alert('please login first!');
            return;
        }

        let res=await fetch(hostname+'/api/sendlike',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pid,'cookie':localStorage.getItem('cookie')}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                document.location.reload();
            }else{
                alert(da.status);
            }
    }



    exports.sendcomment=async(pid,comment)=>{
        if(!localStorage.getItem('cookie')){
            alert('please login first!');
            return;
        }

        let res=await fetch(hostname+'/api/sendcomment',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pid,'cookie':localStorage.getItem('cookie'),comment}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                document.location.reload();
            }else{
                alert(da.status);
            }
    }



    exports.loadallcomment=async(pid)=>{
        if(!localStorage.getItem('cookie')){
            alert('please login first!');
            return;
        }

        let res=await fetch(hostname+'/api/loadcomment',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pid}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                return da.data;
            }else{
                alert(da.status);
            }
            return 'failed';
    }








    exports.loadnotification=async()=>{
        if(!localStorage.getItem('cookie')){
            alert('please login first!');
            return;
        }

        let res=await fetch(hostname+'/api/loadnotification',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'cookie':localStorage.getItem('cookie')}),
        })
        let da=await res.json();
            if(da.status=='OK'){
                return da.data;
            }else{
                alert(da.status);
            }
            return 'failed';
    }