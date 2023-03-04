import { Avatar, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react"
import { getprofiledetails, hostname } from "./AllApi"
import ProfileBackPic from '../image/profileback.jpg'
import { Box, Container } from "@mui/system";
async function loadProfiledetails(setData,profile){
  let data=await getprofiledetails(profile);
  if(data){
    setData(data);
  }
}

export default function Main(){
  let profile=document.location.pathname.split('/')
  profile=profile[profile.length-1]
  if(profile=='profile')document.location='/'
  const [data,setData]=useState(undefined);
  
  if(!data){
    getprofiledetails(profile).then(da=>{
      if(!da?.education&&localStorage.getItem('profile')==profile){
        alert('Please comple your profile!');
        document.location='/settings'
        return ;
      }
      setData(da);
    })
    return <div></div>
  }
  return <div>
    <Card sx={{width:'100%'}}>
      <CardMedia sx={{height:'350px'}} image={ProfileBackPic}></CardMedia>
    </Card>
    <div style={{width:'60%',marginLeft:'20%',backgroundColor:'white',padding:'32px',height:'200px',position:'absolute',top:'210px'}}>
    <ProfileUpper img={data?.img} name={data?.name} jobtitle={data?.skills} address={data?.address} details={data?.details} hourlyrate={data?.hourlyrate}/>
      
    <Paper elevation={3} sx={{padding:'16px',margin:'32px'}}>
        <Typography variant="h6"><b>Portfolio Items</b></Typography>
        <div style={{margin:'32px'}}>
          <Portfolio imgs={data?.portfolio?.split(',')}/>
        </div>
      </Paper>
      
      <Typography variant="h5"><b>Reviews</b></Typography>
      <br></br>
      {(data?.reviews&&data?.reviews.length>0)?(data?.reviews.map((item,index)=>{
        return (<div keys={item.uid}><ReviewItem rating={item.review} name={item.reviewer} review={item.comment}/></div>)
      })):(<Typography variant="h6">No reviews yet!</Typography>)}

          <br></br>
          <br></br>
          <Paper elevation={3} sx={{padding:'8px'}}>
            <Typography variant="h5"><b>Experience</b></Typography>
            </Paper>
            <br></br>
            <Paper elevation={3} sx={{padding:'8px'}}>
            <ExperienceList exp={JSON.parse(data?.experience||'[]')}/>
            </Paper>
            <br></br>
          <br></br>
          <Paper elevation={3} sx={{padding:'8px'}}>
            <Typography variant="h5"><b>Education</b></Typography>
            </Paper>
            <br></br>
            <Paper elevation={3} sx={{padding:'8px'}}>
              {(()=>{
                let edu=JSON.parse(data?.education||'[]')
                let retu=[]
                for (let e of edu){
                  retu.push(<div keys={e.title}><ExperienceItem title={e.programName} time={e.schoolName} details={e.startMonth+'/'+e.startYear+'-'+e.endMonth+"/"+e.endYear}/><br></br></div>)
                }

                return retu;

              })()}
            
            </Paper>
            <br></br>
            <br></br>
            <br></br>

    </div>
  </div>
}

function ExperienceList({exp}){
  let d=[]
  for (let e of exp){
    d.push( <div keys={e.title} ><ExperienceItem  title={e.title} time={e.startMonth+'/'+e.startYear+'-'+e.endMonth+'/'+e.endYear} details={e.details}/> <br></br></div>)
  }
  return d;
}

function ExperienceItem({title,time,details}){
  return (<div>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="h6">{time}</Typography>
    <Typography variant="h6">{details}</Typography>
  </div>)
}

function Portfolio({imgs}){
  let all=imgs?.map((item,index)=>{
    return (<Grid xs={3} item keys={index}>
      <Card sx={{maxWidth:'200px'}}>
        <CardMedia sx={{height:'200px'}} image={hostname+'/images/'+item}></CardMedia>
      </Card>
    </Grid>)
  })
  return (<Grid container spacing={3}>
    {all}
  </Grid>)
}


function ReviewItem({rating,name,review}){
  return (
  <div style={{marginTop:'10px'}}>
      <Grid container>
          <Grid item xs={12}>
             
              <Typography sx={{color:'red'}}>{(()=>{
                  let star=rating;
                  let res=""
                  for(let i=0;i<star;i++){
                      res+="★ "
                  }
                  return res;
              })()}</Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography>by <b>{name}</b></Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography sx={{margin:'10px'}}>{review}</Typography>
          </Grid>
      </Grid>
  </div>)
}


function ProfileUpper({img,name,jobtitle,address,details,hourlyrate}){
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Card sx={{maxWidth:'150px'}}>
          <CardMedia sx={{height:'150px'}} image={hostname+'/images/'+img}></CardMedia>
        </Card>
        <br></br>
        {hourlyrate&&<Typography variant="h6">{hourlyrate+'$/Hour'}</Typography>}
        <Typography variant="h6">{address}</Typography>
      </Grid>

      <Grid item xs={10}>
        <Typography variant="h4">{name}</Typography>
        <Typography>{jobtitle}</Typography>
        <br></br>
        <br></br>
        <Typography variant="h6"> {details}</Typography>
      </Grid>

    

    </Grid>
  )
}