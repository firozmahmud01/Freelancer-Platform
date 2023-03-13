import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

//all file should be linked here with a path

import AllWork from './alljs/allwork'
import Inbox from './alljs/inbox'
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
import { AccountBalance, AccountCircle, AccountTree, Logout, Settings } from '@mui/icons-material';
import { purple } from '@mui/material/colors';
import { loadbalence } from './alljs/AllApi';


function AvatarFunction(){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [balench,setBalence]=useState(0);
  useEffect(()=>{
    loadbalence().then(d=>{
      if(d){
        setBalence(d);
      }
    })
  })
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
  <Avatar color="primary" sx={{ bgcolor: purple[500] }}>{(()=>{let x='';let name=localStorage.getItem('name').split(' ');for(let i=0;i<name.length&&i<2;i++){x+=name[i][0]}return x;})()}</Avatar>
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
    Balance:{balench}
  </Typography>
  <MenuItem onClick={()=>{document.location='/profile/'+localStorage.getItem('profile')}}>
    <ListItemIcon>
      <AccountCircle color='secondary' fontSize="small" />
    </ListItemIcon>
    Profile
  </MenuItem>
  {/* <MenuItem onClick={()=>{document.location='/?q=myproject'}}>
    <ListItemIcon>
      <AccountTree color='secondary' fontSize="small" />
    </ListItemIcon>
    My Projects
  </MenuItem>
  <MenuItem onClick={()=>{document.location='/settings'}}>
    <ListItemIcon>
      <Settings color='secondary' fontSize="small" />
    </ListItemIcon>
    Settings
  </MenuItem>
  <MenuItem onClick={()=>{}}>
    <ListItemIcon>
      <AccountBalance color='secondary' fontSize="small" />
    </ListItemIcon>
    Cash In & Withdraw
  </MenuItem> */}
  <MenuItem onClick={()=>{handleClose();localStorage.removeItem('cookie');localStorage.removeItem('user');document.location='/'}}>
    <ListItemIcon>
      <Logout color='secondary' fontSize="small" />
    </ListItemIcon>
    Logout
  </MenuItem>
</Menu>
</div>

  )



}




function TitleBarApp({appbar}){
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
            <AvatarFunction/>
            </div>
            <IconButton color='secondary' onClick={()=>{document.location='/?q=myproject'}}>
              <AccountTree />
            </IconButton>
            <IconButton color='secondary' onClick={()=>{document.location='/settings'}}>
            <Settings />
            </IconButton>
            <IconButton color='secondary' onClick={()=>{setOpen(true)}}>
            <AccountBalance />
            </IconButton>

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
    <Route path='/settings' element={<SettingsPage setAppBar={setAppBar}/>}>
  
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
