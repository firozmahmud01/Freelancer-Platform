import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

//all file should be linked here with a path

import AllWork from './alljs/allwork'
import Inbox from './alljs/inbox'
import NotificationPage from './alljs/notificationpage'
import Comments from './alljs/commentlist'
import Cashout from './alljs/cashinwithdraw'
import OptionAndSkill from './alljs/optionandskillset'
import Profile from './alljs/profile'
import Login from './alljs/login'
import SettingsPage from './alljs/settingspage'
import UploadPost from './alljs/uploadpost'
import VideoPage from './alljs/videopage'
import WorkApplication from './alljs/workapplication'
import WorkDetails from './alljs/workdetails'
import Chatlist from './alljs/chatlist'
import NotFound from './alljs/NotFound'
import HomePageChooser from './alljs/homepagechooser'
import {AppBar, Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import IconImage from './image/icon.png'
import { AccountBalance, AccountCircle, AccountTree, Logout, Notifications, Settings } from '@mui/icons-material';
import { purple } from '@mui/material/colors';
import { hostname, loadbalence } from './alljs/AllApi';


function AvatarFunction(){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
    <IconButton
    onClick={handleClick}
    size="small"
    sx={{ ml: 2 }}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
  >
  <Avatar sx={{ bgcolor: purple[500] }} src={hostname+'/images/'+localStorage.getItem('profile')+".jpg"}></Avatar>
  </IconButton>

<Menu
  anchorEl={anchorEl}
  id="account-menu"
  open={open}
  onClose={handleClose}
  onClick={handleClose}
  PaperProps={{
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  }}
  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>
<Typography sx={{margin:'16px'}}>
    
  </Typography>
  <MenuItem onClick={()=>{localStorage.removeItem('cookie');localStorage.removeItem('user');document.location='/'}}>
  <IconButton >
              <Logout/>
            </IconButton>
              Logout
  </MenuItem>

</Menu>
</div>

  )



}




function TitleBarApp({appbar}){
  const [balench,setBalence]=useState(0);
  useEffect(()=>{
    loadbalence().then(d=>{
      if(d){
        setBalence(d);
      }
    })
  })
  const [open, setOpen] = useState(false);
  if(!localStorage.getItem('cookie')){
    return;
  }
  return (
    <AppBar position="absolute" sx={{backgroundColor:'yellow'}}>
      <Toolbar >
        <IconButton onClick={()=>document.location='/'}>
          <img style={{height:'40px',marginTop:'5px',marginBottom:'5px'}} src={IconImage}></img>
        </IconButton>
        
        <Typography sx={{cursor: 'pointer',color:'black' }} variant="h6" onClick={()=>document.location='/'} color={"inherit"}><b>24/7 Work</b></Typography>
        <div style={{marginLeft:'auto' ,right:'0px'}}>
          <Cashout open={open} setOpen={setOpen}/>
            
            </div>
            <IconButton onClick={()=>{document.location='/profile/'+localStorage.getItem('profile')}}>
              <AccountCircle sx={{color:'white'}}/>
            </IconButton>
            <IconButton color='secondary' onClick={()=>{document.location='/?q=myproject'}}>
              <AccountTree sx={{color:'white'}}/>
            </IconButton>
            <IconButton color='secondary' onClick={()=>{document.location='/notification'}}>
              <Notifications sx={{color:'white'}}/>
            </IconButton>
            {/* <IconButton color='secondary' onClick={()=>{document.location='/settings'}}>
            <Settings />
            </IconButton> */}
            <IconButton color='secondary' onClick={()=>{setOpen(true)}}>
            <AccountBalance sx={{color:'white'}}/>
            </IconButton>
            <AvatarFunction/>
            
            <Typography color={'black'}>Balance:{balench}</Typography>
      </Toolbar>
    </AppBar>
  )
}
function LinkChecker({setAppBar}){
  return (<BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePageChooser setAppBar={setAppBar} />}>
  
    </Route>
    <Route path='/profile/*' element={<Profile setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/login' element={<Login setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/work' element={<AllWork setAppBar={setAppBar}/>}>
  
    </Route>
    <Route path='/profile/edit' element={<SettingsPage setAppBar={setAppBar}/>}>
  
    </Route>

    <Route path='/chat' element={<Chatlist setAppBar={setAppBar}/>}>
  
    </Route>
    <Route path='/chat/inbox' element={<Inbox setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/option' element={<OptionAndSkill setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/upload' element={<UploadPost setAppBar={setAppBar}/>} >
      
    </Route>
    <Route path='/comments' element={<Comments/>} >
      
    </Route>
    <Route path='/videos' element={<VideoPage setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/notification' element={<NotificationPage setAppBar={setAppBar}/>} >
  
    </Route>
    <Route path='/work/apply' element={<WorkApplication setAppBar={setAppBar}/>} >
  
    </Route>
    
    
    <Route path='/project' element={<WorkDetails setAppBar={setAppBar}/>} ></Route>
    
    <Route path="*" element={<NotFound setAppBar={setAppBar}/>}/>
    </Routes>
    </BrowserRouter>)
}
function MainPage(){
  const [appbar,setAppBar]=useState(true)
  return (<div>
    {appbar&&(<TitleBarApp/>)}
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <LinkChecker setAppBar={setAppBar}/>
    
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<MainPage/>
);
