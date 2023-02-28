const { productitem, productdetails, reviewitem, babysitteritem, babysitterdetails } = require("./ClassList")

const fakeimage='http://admission.bauet.ac.bd/img/logo.png'


const hostname='http://localhost:4000'

exports.getSearchResult=(query,skills)=>{

}



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

    exports.projectlist=async()=>{

    }
    exports.currentprojects=async()=>{

    }
    exports.getprofiledetails=async(link)=>{
        let res=await fetch(hostname+'/api/profile?id='+link);
        let data=await res.json()
        if(data.status=='OK'){
            console.log(data);
        }else{
            alert(data.status);
        }
    }
    exports.updateprofiledetails=async(updatedata)=>{
        let res=await fetch(hostname+'/api/updateprofile',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedata),
        })
        let data=await res.json();
        if(data.status=='OK'){
            document.location.reload();
        }
    }
    exports.withdrawrequest=async(amount,number)=>{
        
    }

    exports.uploadProfilePicture=async(pic)=>{
        
    }

    exports.cashinrequest=async(amount,number,refarencenumber)=>{

    }

    exports.getprojectdetails=async()=>{

    }
    exports.uploadproject=async(title,requirements,details,amountrange,attachments)=>{
        
    }
    exports.previousmessageinbox=async()=>{

    }

    exports.bidrequest=async(name,userid,amount,timelength,message)=>{

    }
    exports.bidlist=async(projectid)=>{

    }

    exports.searchproject=async(keyword)=>{

    }