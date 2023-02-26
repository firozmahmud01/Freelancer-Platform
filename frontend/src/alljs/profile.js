import { Avatar, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react"
import { getprofiledetails } from "./AllApi"
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
  // if(!data){
  //   loadProfiledetails(setData,profile);
  //   return <div></div>
  // }
  return <div>
    <Card sx={{width:'100%'}}>
      <CardMedia sx={{height:'350px'}} image={ProfileBackPic}></CardMedia>
    </Card>
    <div style={{width:'60%',marginLeft:'20%',backgroundColor:'white',padding:'32px',height:'200px',position:'absolute',top:'210px'}}>
    <ProfileUpper img={'https://bauet.ac.bd/wp-content/uploads/2020/11/BAUET-Logo-250x244-1.png'} name={localStorage.getItem('name')} jobtitle={"Graphics Designer"} address={"BAUET, Nator"} details={"A graphic designer is a professional within the graphic design and graphic arts industry who assembles together images, typography, or motion graphics to create a piece of design. A graphic designer creates the graphics primarily for published, printed, or electronic media, such as brochures and advertising."} hourlyrate={'100৳/hour'}/>
      
    <Paper elevation={3} sx={{padding:'16px',margin:'32px'}}>
        <Typography variant="h6"><b>Portfolio Items</b></Typography>
        <div style={{margin:'32px'}}>
          <Portfolio imgs={[ProfileBackPic,ProfileBackPic,ProfileBackPic,ProfileBackPic,
          ProfileBackPic,ProfileBackPic,ProfileBackPic,ProfileBackPic]}/>
        </div>
      </Paper>
      
      <Typography variant="h5"><b>Reviews</b></Typography>
      <br></br>
      <Typography variant="h6">No reviews yet!</Typography>

          <br></br>
          <br></br>
          <Paper elevation={3} sx={{padding:'8px'}}>
            <Typography variant="h5"><b>Experience</b></Typography>
            </Paper>
            <br></br>
            <Paper elevation={3} sx={{padding:'8px'}}>
            <ExperienceList/>
            </Paper>
            <br></br>
          <br></br>
          <Paper elevation={3} sx={{padding:'8px'}}>
            <Typography variant="h5"><b>Education</b></Typography>
            </Paper>
            <br></br>
            <Paper elevation={3} sx={{padding:'8px'}}>
            <ExperienceItem title="BSC in CSE" time="Bangladesh Army University of Engineering and Technology" details="Jan 2019-Jun 2023"/>
            </Paper>
            <br></br>
            <br></br>
            <br></br>

    </div>
  </div>
}

function ExperienceList(){
  let data=[{title:'Graphics Designer',time:'Jan 2018-Dec 2020',details:'I was working with a farm called \'Motion Graphic\' as a Graphics Designer'}]
  return <ExperienceItem title={data[0].title} time={data[0].time} details={data[0].details}/>
}

function ExperienceItem({title,time,details}){
  return (<div>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="h6">{time}</Typography>
    <Typography variant="h6">{details}</Typography>
  </div>)
}

function Portfolio({imgs}){
  let all=imgs.map((item,index)=>{
    return (<Grid xs={3} item keys={index}>
      <Card sx={{maxWidth:'200px'}}>
        <CardMedia sx={{height:'200px'}} image={item}></CardMedia>
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
          <CardMedia sx={{height:'150px'}} image={img}></CardMedia>
        </Card>
        <br></br>
        <Typography variant="h6">{hourlyrate}</Typography>
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