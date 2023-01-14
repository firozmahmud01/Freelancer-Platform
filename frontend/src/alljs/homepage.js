//full background pic
//bold text on the upper side like design
//some note with ul
//two button 
//footer ==done





import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Typography, Grid, IconButton, Card, CardMedia, Button} from '@mui/material';
import {Facebook, Google, Opacity, Twitter, YouTube} from '@mui/icons-material';

import { getbabysitteritem, getfoodlist } from './AllApi';

import HomeBack from '../image/homeback.jpeg'









function Footer(){
return (<div style={{display:'block',width:'100%',height:'200px',backgroundColor:'black',position:'relative'}}>
    <div style={{display:'block',top:'50%',position:'absolute',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
        <Typography variant='h4' sx={{color:'white'}} textAlign="center">Freelancer</Typography>
        <Typography variant='body2' sx={{color:'white'}} textAlign='center'>This website is about<br></br>freelancing.</Typography>
        <Grid container >
            <Grid item xs={3}>
            <IconButton>
                <Facebook sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <YouTube sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <Google sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <Twitter sx={{color:'white'}}/>
            </IconButton>
            </Grid>
        </Grid>
    </div>
    <Typography sx={{color:'white',bottom:'15px',left:'15px' ,position:'absolute'}}>Copyright @2023 <a style={{color:'white'}} href="https://bauet.ac.bd/">BAUET</a></Typography>
</div>)
}
function HomeNotePoints(){
    return(
        <div>
    <Typography>We offer many jobs. Such as</Typography>
    <ul>
        <li>Photograffer</li>
        <li>Logo designe</li>
        <li>Programmer</li>
        <li>3d artist</li>
        <li>Vfx artist</li>
        <li>and more</li>
    </ul>
    </div>)

}
function ButtonsOfHome(){
    return (<div>
            <Button onClick={()=>{
                document.location='/login?q=clent'
            }} color='secondary' variant='contained'>Hire a freelancer</Button>

            <Button sx={{marginLeft:"10px"}} onClick={()=>{
                document.location='/login?q=freelancer'
            }} color='inherit' variant='contained'>Earn Money Freelancing</Button>
        </div>
    );
}
export default function Main(){
    return (
        <div>
            
                <Card sx={{position:'fixed' ,top:0,left:0,right:0,bottom:0,height:'100%',width:'100%'}}>
                    <CardMedia sx={{height:"100%", opacity:0.4}} image={HomeBack}/>
                </Card>
            <div style={{position:'absolute',top:100,left:0,right:0}}>
                <Typography sx={{marginTop:'100px',marginLeft:'100px'}} variant='h4'>Hire the best<br></br>freelancers for any job<br></br>online.</Typography>

                <div style={{marginTop:'40px',marginLeft:'100px'}}>
                    <HomeNotePoints/>
                </div>
                <div style={{marginTop:'40px',marginLeft:'100px'}}>
                    <ButtonsOfHome/>
                </div>
                

                 <div style={{marginTop:'40%'}}>
                    <Footer/>
                </div>   
            </div>
        </div>
        )
    }