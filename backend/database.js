let crypto = require('crypto');
let mysql = require('mysql');
let fs=require("fs")

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  });
  
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS Freelancer", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      con.query("USE Freelancer");
    
    con.query("CREATE TABLE IF NOT EXISTS normaluser(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,email TEXT,pass TEXT,token TEXT,userType TEXT,balance INTEGER DEFAULT 0,img TEXT,profile TEXT DEFAULT 0,details TEXT,skills TEXT,portfolio TEXT,experience TEXT,education TEXT,address TEXT,hourlyrate TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS projects(uid INTEGER PRIMARY KEY AUTO_INCREMENT,title TEXT,requirements TEXT,details TEXT,attachments TEXT,pricerange TEXT,publishername TEXT,publisheruid TEXT,worker TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS bidlist(uid INTEGER PRIMARY KEY AUTO_INCREMENT,price TEXT,time TEXT,details TEXT,profile TEXT,img TEXT,biddername TEXT,projectid TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS messages(uid INTEGER PRIMARY KEY AUTO_INCREMENT,msg TEXT,time TEXT,sender TEXT,receiver TEXT,projectid TEXT);")
    
    
  });

  });


async function getData(cmd,arg){
  let p= await new Promise((response,error)=>{
    con.query(cmd,arg, function (err, result, fields) {
      if (err){ error(err); return;}
      response(result);
    });
  })
  return p;
  
}

exports.updateProfile=async (data,cookie)=>{
  let keys=Object.keys(data);
  if(keys.indexOf('img')>=0){
    await updateProfilePicture(data['img'],cookie);
    delete data['img'];
    keys=Object.keys(data);
    if(keys.length<=0){
      return "OK";
    }
  }

  if(keys.indexOf('portfolio')>=0){
    let list=await getData('SELECT uid,portfolio FROM normaluser WHERE token=?',[cookie]);
    if(list.length>0){
      let port=list[0].portfolio
      let folio=''
      if(port){
        folio=port+',';
      }
      let img=await saveimage(data['portfolio']);
      folio+=img;
      await getData('UPDATE normaluser SET portfolio=? WHERE uid=?',[folio,list[0].uid])
      delete data.portfolio;
      keys=Object.keys(data);
      if(keys.length<=0){
        return "OK"
      }
    }
  }





    if(keys.indexOf('pass')>=0){
      let upass=crypto.createHash('sha256').update(data.pass).digest('base64');
        await getData('UPDATE normaluser SET pass=? WHERE token=?',[upass,cookie])
        delete data.pass;
        keys=Object.keys(data);
        if(keys.length<=0){
          return "OK"
        }
      }





let cmd='UPDATE normaluser SET';
let arg=[];
    for (let key of keys){
      cmd+=' '+namespaceremover(key)+'=?,'
      
      arg.push(data[key]);
    }
    cmd=cmd.substring(0,cmd.length-1);
    if(keys.length>0){
      cmd+=' WHERE token=?'
      await getData(cmd,[...arg,cookie])
      return "OK"
    }


}





async function updateProfilePicture(pic,token){
  let name=await getData('SELECT img FROM normaluser WHERE token=?;',[token]);
  if(name.length<=0){
    return ;
  }else{
    await saveimagewithname(pic,name[0].img);
    return 'OK';
  }
}



exports.checktoken=async(token)=>{
  const cmd="SELECT uid,name,email,phone FROM normaluser WHERE token=?;"
  let data=await getData(cmd,[token])
  if(data?.uid){
    return data;
  }else{
    return undefined;
  }
}




function namespaceremover(name){
  
  let res='';
  for (let i=0;i<name.length;i++){
    if((name[i]>='a'&&name[i]<='z')||(name[i]>='A'&&name[i]<='Z'))res+=name[i];}
  return res.toLowerCase();
}


exports.createUser=async(name,email,pass,userType)=>{
  let upass=crypto.createHash('sha256').update(pass).digest('base64');
  const cmd="SELECT uid FROM normaluser WHERE email=?;"
  let data=await getData(cmd,[email])
  
  if((data&&data[0]?.uid)||data?.uid){
    return "This email already exists.";
  }else{
    await getData("INSERT INTO normaluser (name, email, pass, userType) VALUES (?,?,?,?);",[name,email,upass,userType])
    let da=await getData('SELECT uid FROM normaluser WHERE email=?',[email]);

    await getData('UPDATE normaluser SET profile=? ,img=? WHERE uid=?',[namespaceremover(name)+''+da[0].uid,namespaceremover(name)+''+da[0].uid+'.jpg',da[0].uid])
    return "OK"
  }

}




exports.getProfileDetails=async(link)=>{
  let data=await getData('SELECT * FROM normaluser WHERE profile=?',[link]);
  if(data.length>0){
    delete data[0].pass
    return data[0];
  }
}


exports.checkauth=async(user,pass)=>{
    let upass=crypto.createHash('sha256').update(pass).digest('base64');
    let salt = crypto.randomBytes(27).toString('hex'); 
    console.log(user,upass)
    const cmd="SELECT uid,profile,img,name,balance,userType FROM normaluser WHERE email=? AND pass=?;"
    let data=await getData(cmd,[user,upass])
    if((data&&data[0]?.uid)||data?.uid){
      await getData("UPDATE normaluser SET token=? WHERE uid=?;",[salt,data[0].uid])
      return {cookie:salt,name:data[0].name,img:data[0].img,balance:data[0].balance,userType:data[0].userType,profile:data[0].profile};
    }else{
      return undefined;
    }

}






async function saveimage(img){
  let base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  let name="image"+Date.now()+".jpg"
  return await new Promise((res,erro)=>{
    fs.writeFile('images/'+name, base64Data, 'base64', function(err) {
      if(err){
        erro(err)
      }else{
        res(name)
      }
    
    });
  })
  
}



async function saveimagewithname(img,name){
  let base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  return await new Promise((res,erro)=>{
    fs.writeFile('images/'+name, base64Data, 'base64', function(err) {
      if(err){
        erro(err)
      }else{
        res(name)
      }
    
    });
  })
  
}



exports.uploadProjects=async (title,details,requirements,pricerange,attachments,cookie)=>{
  let getd=await getData('SELECT name,uid FROM normaluser WHERE token=?',[cookie]);
  if(getd.length<=0)return;
let imgs=[];
for(let i of attachments){
  let name=await saveimage(i);
  imgs.push(name);
}
  await getData('INSERT INTO projects(title,details,pricerange,requirements,attachments,publishername,publisheruid) VALUES(?,?,?,?,?,?,?)',[title,details,pricerange,requirements,JSON.stringify(imgs),getd[0].name,getd[0].uid])
return 'OK';
}


exports.getProjectlist=async(query)=>{
  let cmd='SELECT uid,title,publishername,details,requirements FROM projects WHERE worker IS NULL'+(query?' AND (title LIKE ? OR details LIKE ? OR skills LIKE ?)':'')
  let prm=[]
  if(query){
    prm.push('%'+query+"%")
    prm.push('%'+query+"%")
    prm.push('%'+query+"%")
  }
  let da=await getData(cmd,prm)
  return da;


}


exports.getProjectDetails=async(pid,token)=>{
  let user=await getData('SELECT * FROM normaluser WHERE token=?',[token])
if(user.length<=0)return;
  let data= await getData('SELECT * FROM projects WHERE uid=?',[pid]);

  if(data.length<=0)return ;
  let res={...data[0]}
  if(data[0].publisheruid==user[0].uid){
    if(data[0].worker){
      res.message=await getData('SELECT * FROM messages WHERE projectid=?',[data[0].uid])
    }else{
      res.biders=await getData('SELECT * FROM bidlist WHERE projectid=?',[data[0].uid])
    }
  }
if(user[0].profile==data[0].worker){
  res.message=await getData('SELECT * FROM messages WHERE projectid=?',[data[0].uid])
}
    return res;
  
}

exports.requestbit=async(price,time,details,projectid,cookie)=>{
  // bidlist(uid ,price ,time ,details ,profile ,img ,biddername ,projectid
  let user=await getData('SELECT * FROM normaluser WHERE token=?',[cookie]);
  if(user.length<=0)return;
  await getData('INSERT INTO bidlist(price,time,details,projectid,profile,img,biddername) VALUES(?,?,?,?,?,?,?)',[price,time,details,projectid,user[0].profile,user[0].img,user[0].name])
  return 'OK';
}