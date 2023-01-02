import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

//all file should be linked here with a path

import AllWork from './alljs/allwork'
import Inbox from './alljs/inbox'
import OptionAndSkill from './alljs/optionandskillset'
import Profile from './alljs/profile'
import Login from './alljs/login'
import UploadPost from './alljs/uploadpost'
import VideoPage from './alljs/videopage'
import WorkApplication from './alljs/workapplication'
import WorkDetails from './alljs/workdetails'
import Chatlist from './alljs/chatlist'
import NotFound from './alljs/NotFound'
import HomePageChooser from './alljs/homepagechooser'
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material'
import IconImage from './image/icon.png'
function TitleBarApp({appbar}){
  return (
    <AppBar position="absolute">
      <Toolbar >
        <IconButton onClick={()=>document.location='/'}>
          <img style={{height:'50px',marginTop:'5px',marginBottom:'5px'}} src={IconImage}></img>
        </IconButton>
        
        <Typography sx={{cursor: 'pointer' }} onClick={()=>document.location='/'} variant='h6' color={"inherit"}>Freelancer</Typography>
  {(()=>{})()}
       <Button onClick={()=>document.location="/login"} color="inherit" style={{position:'absolute',right:12}}>Login</Button>
       
      </Toolbar>
    </AppBar>
  )
}
function LinkChecker({setAppBar}){
  return (<BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePageChooser setAppBar={setAppBar} />}>
  
    </Route>
    <Route path='/profile' element={<Profile setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/login' element={<Login setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/work' element={<AllWork setAppBar={setAppBar}/>}>
  
    </Route>
    <Route path='/chat' element={<Chatlist setAppBar={setAppBar}/>}>
  
    </Route>
    <Route path='/chat/inbox' element={<Inbox setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/option' element={<OptionAndSkill setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/upload' element={<UploadPost setAppBar={setAppBar}/>} >
      
    </Route>
    <Route path='/videos' element={<VideoPage setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/work/apply' element={<WorkApplication setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/work/details' element={<WorkDetails setAppBar={setAppBar}/>} ></Route>
    
    <Route path="*" element={<NotFound setAppBar={setAppBar}/>}/>
    </Routes>
    </BrowserRouter>)
}
function MainPage(){
  const [appbar,setAppBar]=useState(true)
  return (<div>
    {appbar&&(<TitleBarApp appbar={appbar}/>)}
    <LinkChecker setAppBar={setAppBar}/>
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<MainPage/>
);
