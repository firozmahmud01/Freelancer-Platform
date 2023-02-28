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
    
    con.query("CREATE TABLE IF NOT EXISTS normaluser(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,email TEXT,pass TEXT,token TEXT,userType TEXT,balance INTEGER DEFAULT 0,img TEXT,profile TEXT DEFAULT 0,details TEXT,jobtitle TEXT,portfolio TEXT,experience TEXT,education TEXT);")


                                                            // title,requirements,details,attachments,pricerange
    con.query("CREATE TABLE IF NOT EXISTS projects(uid INTEGER PRIMARY KEY AUTO_INCREMENT,title TEXT,requirements TEXT,details TEXT,attachments TEXT,pricerange TEXT);")
    
    
    
    // con.query("CREATE TABLE IF NOT EXISTS babyproduct(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,img TEXT,price TEXT,brand TEXT,pointmsg TEXT,details TEXT,rating INTEGER DEFAULT 0);")
    // con.query("CREATE TABLE IF NOT EXISTS productreview(uid INTEGER PRIMARY KEY AUTO_INCREMENT,productid INTEGER,reviewername TEXT,rating TEXT,review TEXT);")

    // con.query("CREATE TABLE IF NOT EXISTS babysitter(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,profilepic TEXT,phone TEXT,education TEXT,experience TEXT,details TEXT,age TEXT,gender TEXT,email TEXT,pass TEXT);")

    
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
exports.updateProfilePicture=async(pic,token)=>{
  let name=await getData('SELECT img FROM normaluser WHERE token=?;',[token]);
  if(name.length<=0){
    return ;
  }else{
    await saveimage(pic,name[0].img);
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

    await getData('UPDATE normaluser SET profile=? ,img=?',[namespaceremover(name)+''+da[0].uid,namespaceremover(name)+''+da[0].uid+'.jpg'])
    return "OK"
  }

}
exports.getProfileDetails=async(link)=>{
  let data=await getData('SELECT uid,name,email,userType,img,profile FROM normaluser WHERE profile=?',[link]);
  if(data.length>0){
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



exports.getfoodlist=async(start,end)=>{
  let cmd='SELECT uid,name,img,price,brand,rating FROM babyproduct LIMIT ?, ?;';
  let data=await getData(cmd,[Number(start),Number(end)])
  let result=[]
  for(let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new productitem(d.uid,d.name,d.img,d.price,d.rating,d.brand))
  }
  return result;
}
exports.getfooddetails=async(id)=>{
  let cmd='SELECT * FROM babyproduct WHERE uid=?;';
  let data=await getData(cmd,[Number(id)])
  if(data.length>0){
    let reviews=[]
    let rev=await getData('SELECT * FROM productreview WHERE productid=?;',[data[0].uid])
    if(rev.length>0){
      reviews.push(new reviewitem(rev[0].uid,rev[0].reviewername,rev[0].review,rev[0].rating))
    }
    return new productdetails(data[0].uid,data[0].name,data[0].img,data[0].price,data[0].rating,data[0].brand,reviews,data[0].pointmsg,data[0].details)
  }
}



exports.getbabysitteritem=async(start,end)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience FROM babysitter LIMIT ?, ?;'
  let data=await getData(cmd,[Number(start),Number(end)])
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitteritem(d.uid,d.name,d.profilepic,d.education,d.experience,d.age,d.gender))

  }

  return result;

}

exports.getbabysitterdetails=async(id)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience,details FROM babysitter LIMIT ?, ?;'
  let data=await getData(cmd,[+start,+end])
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitterdetails(d.uid,d.name,d.profilepic,d.phone,d.education,d.experience,d.details,d.age,d.gender))

  }

  return result;
}

exports.getsearch=async(q,start,end)=>{

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



async function saveimage(img,name){
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




exports.uploadfood=async(name,img,prize,brand,pointmsg,details)=>{
  try{  
  let save=await saveimage(img)
  let cmd='INSERT INTO babyproduct(name,img,price,brand,pointmsg,details) VALUES(?,?,?,?,?,?)';
  await getData(cmd,[name,save,prize,brand,pointmsg,details])
    return 'OK'
  }catch(e){
    fs.unlink('images/'+save);
    console.log(e)
  }



}