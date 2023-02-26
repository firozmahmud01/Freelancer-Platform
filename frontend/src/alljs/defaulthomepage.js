//full background pic
//bold text on the upper side like design
//some note with ul
//two button 
//footer ==done





import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Typography, Grid, IconButton, Card, CardMedia, Button, TextField, Select, ListItem, MenuItem} from '@mui/material';
import {Facebook, Google, Opacity, Twitter, YouTube} from '@mui/icons-material';

import { loginuser, signupuser } from './AllApi';

import SideImage from '../image/sideimage.png'









// function Footer(){
// return (<div style={{display:'block',width:'100%',height:'200px',backgroundColor:'black',position:'relative'}}>
//     <div style={{display:'block',top:'50%',position:'absolute',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
//         <Typography variant='h4' sx={{color:'white'}} textAlign="center">Freelancer</Typography>
//         <Typography variant='body2' sx={{color:'white'}} textAlign='center'>This website is about<br></br>freelancing.</Typography>
//         <Grid container >
//             <Grid item xs={3}>
//             <IconButton>
//                 <Facebook sx={{color:'white'}}/>
//             </IconButton>
//             </Grid>
//             <Grid item xs={3}>
//             <IconButton>
//                 <YouTube sx={{color:'white'}}/>
//             </IconButton>
//             </Grid>
//             <Grid item xs={3}>
//             <IconButton>
//                 <Google sx={{color:'white'}}/>
//             </IconButton>
//             </Grid>
//             <Grid item xs={3}>
//             <IconButton>
//                 <Twitter sx={{color:'white'}}/>
//             </IconButton>
//             </Grid>
//         </Grid>
//     </div>
//     <Typography sx={{color:'white',bottom:'15px',left:'15px' ,position:'absolute'}}>Copyright @2023 <a style={{color:'white'}} href="https://bauet.ac.bd/">BAUET</a></Typography>
// </div>)
// }


function DefaultRight({setType}){
    return <div style={{marginTop:'50%',transform:'translateY(-50%)',marginRight:'32px'}}>
    <div style={{textAlign:'end'}}>
    <Typography variant={'h6'}>Welcome to</Typography>
    <Typography variant='h2' color={"yellow"} ><b>24/7 Work</b></Typography>
    <Typography variant='h5'>We connect you with the professionals<br></br>to get your job done.Our experts push<br></br>themselves to their absolute limit so<br></br>you can breathe in relief.</Typography>
    </div>
        <div style={{textAlign:'center',marginLeft:'50%',transform:'translateX(-25%)',marginTop:'64px'}}>
            <Typography sx={{marginTop:'8px'}}>Want to hire someone?</Typography>
            <Typography sx={{marginTop:'8px'}}>Or,</Typography>
            <Typography sx={{marginTop:'8px'}}>Test your abilities</Typography>
            <Button variant='contained' onClick={()=>{setType('login')}} color='inherit' sx={{marginTop:'16px',backgroundColor:'yellow'}}><Typography color={'black'}>JOIN US</Typography></Button>
        </div>
    </div>
}

function LoginScreen({setType}){
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');

return (     
<div style={{marginTop:'50%',marginRight:'16px' ,transform:'translateY(-50%)' ,marginLeft:'16px'}}>
        <div style={{textAlign:'end'}}>
        <Typography sx={{cursor:'pointer'}} variant={'h6'} onClick={()=>{setType('default')}}>{'<'} Go to home</Typography>
        <Typography variant='h2' color={"yellow"} ><b>Login</b></Typography>
        
        </div>
<Grid container sx={{marginTop:'64px'}} spacing={3}>
    <Grid item xs={12}>
    <TextField value={email} onChange={e=>setEmail(e.target.value)} fullWidth variant='outlined' label="Email Address"></TextField>
    </Grid>
    <Grid item xs={12}>
    <TextField value={pass} type="password" onChange={e=>setPass(e.target.value)} fullWidth variant='outlined' label="Password"></TextField>
    </Grid>
    <Grid item xs={3} >
    <Button variant='contained' color='inherit' sx={{marginTop:'16px',backgroundColor:'yellow'}} onClick={()=>{loginuser(email,pass)}}><Typography color={'black'}>Sign In</Typography></Button>
    </Grid>
    <Grid item xs={9} sx={{marginTop:'20px'}}>
    <Typography variant='h6'>Need an account? <span style={{color:'blue',cursor:'pointer'}} onClick={()=>setType('signup')} >Create Account</span></Typography>
    </Grid>

    </Grid>
    </div>)
}


function SignupScreen({setType}){
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [pass,setPassword]=useState('')
    const [usertype,setUserType]=useState('worker')
    return (     
        <div style={{marginTop:'50%',marginRight:'16px' ,marginLeft:'16px',transform:'translateY(-50%)'}}>
                <div style={{textAlign:'end'}}>
                <Typography sx={{cursor:'pointer'}} variant={'h6'} onClick={()=>{setType('login')}}>{'<'} Back to Sign in</Typography>
                <Typography variant='h2' color={"yellow"} ><b>Create Account</b></Typography>
                
                </div>
        <Grid container sx={{marginTop:'64px'}} spacing={3}>
        <Grid item xs={12}>
            <TextField value={name} onChange={e=>setName(e.target.value)} fullWidth variant='outlined' label="Full Name"></TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField value={email} onChange={e=>setEmail(e.target.value)} fullWidth variant='outlined' label="Email Address"></TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField value={pass} onChange={e=>setPassword(e.target.value)} fullWidth variant='outlined' label="Password"></TextField>
            </Grid>
            <Grid item xs={12}>
                
               
            <Select value={usertype} onChange={e=>setUserType(e.target.value)} fullWidth variant='outlined' >
                <MenuItem value="worker">Worker</MenuItem>
                <MenuItem value="client">Client</MenuItem>
            </Select>
            
            </Grid>
            <Grid item xs={12} >
            <Button variant='contained' onClick={()=>{signupuser(name,email,pass,usertype)}} color='inherit' sx={{marginTop:'16px',backgroundColor:'yellow'}}><Typography color={'black'}>Create Account</Typography></Button>
            </Grid>
            
        
            </Grid>
            </div>)
}



function Leftside(){
    return <img style={{height:'100%'}} src={SideImage}></img>
}




function Rightside(){
    const [type,setType]=useState('default');

    if(type=='default'){
        return (<div style={{backgroundColor:'white',marginLeft:'60%',position:'absolute',width:'40%',height:'100%'}}>
                
                <DefaultRight setType={setType}></DefaultRight>
            </div>)
    }else if(type=='login'){
        return (
        <div style={{backgroundColor:'white',marginLeft:'60%',position:'absolute',width:'40%',height:'100%'}}>
                
                <LoginScreen setType={setType}></LoginScreen>
            </div>)
    }else if(type=='signup'){
        return (<div style={{backgroundColor:'white',marginLeft:'60%',position:'absolute',width:'40%',height:'100%'}}>
            <SignupScreen setType={setType}></SignupScreen>
                
            </div>)
    }

}



export default function Main(){
    return (
       <div>
            <div style={{width:"60%",height:'100%',position:'absolute'}}>
                <Leftside></Leftside>
            </div>
            
                <Rightside></Rightside>
            
            </div>
        )
    }