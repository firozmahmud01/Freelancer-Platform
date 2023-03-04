import { CloudDownload, Send } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import {acceptbidrequest, bidrequest, getprojectdetails, hostname, loadmsg, sendmsg, submitreview} from './AllApi'


export default function Main(){
   const [project,setProject]=useState()
   const [review,setReview]=useState(false);
   const [open,setOpen]=useState(false);
   const searchParams = new URLSearchParams(window.location.search);
   const pid = searchParams.get("id")||undefined;
   if(!pid)document.location='/'
  if(!project){
    getprojectdetails(pid).then(da=>{
      
      setProject(da);
    });
    return <div></div>

  }



  const handleBid = () => {
    setOpen(true);
  };

  return (
    <div>
      <PopupDialog open={open} onClose={()=>setOpen(false)} projectid={pid}/>
      <ReviewDialog open={review} onClose={()=>setReview(false)} projectid={pid}/>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <div style={{width:'100%',padding:'32px'}}>
          <Typography variant="h3">{project.title}</Typography>
          <Typography variant="subtitle1">Published by {project.publishername}</Typography>
          <br></br>
          <Typography variant="h5">{project.pricerange}</Typography>
          <br></br>
          <br></br>
          <Typography variant="body1">{project.details}</Typography>
          <br></br>
          <Typography variant="body1">Skills Required: {project.requirements}</Typography>
          <br></br>
          <br></br>
          <br></br>
          <Grid container>
            <Grid item xs={9}>
          <Typography variant="h5"><b>Files</b></Typography>
          </Grid>
          <Grid item xs={3}>
            {localStorage.getItem('userType') === "worker"&&!project.worker && (
              <Button variant="contained" sx={{color:'black',backgroundColor:'yellow'}} fullWidth color="primary" onClick={handleBid} >BID THIS PROJECT</Button>
              )}
              {localStorage.getItem('userType') != "worker"&&project.worker&&<Button variant="contained" fullWidth sx={{color:'black',backgroundColor:'yellow'}} onClick={()=>setReview(true)}>Project is Complete</Button>}
          </Grid>
          
          </Grid>
          <br></br>
          {project?.attachments&&project?.attachments?.length>0&&(<Card elevation={10}>
            <CardContent>
              <List>
                {JSON.parse(project?.attachments||'[]').map((item,index)=>{
                  return (<ListItem key={index}>
                    <ListItemText primary={<Typography variant="h6">{item}</Typography>}>
                        </ListItemText>
                        <ListItemIcon ><IconButton target="_blank" href={hostname+'/images/'+item}><CloudDownload sx={{width:'32px',height:'32px'}} color="primary"/></IconButton></ListItemIcon>
                  </ListItem>)
                })}
              </List>
            </CardContent>
          </Card>)}
          
          
          
            </div>
          
</Grid>
<Grid item xs={2}></Grid>
<Grid item xs={4}>
{project.message&&<InboxView msg={project.message} projectid={pid}/>}
{project?.biders?.length > 0 && (
            <div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Typography variant="h4">Bidders:</Typography>
              
                {project?.biders?.map((bidder) => (
                  <div key={bidder.uid}>
                    <br></br>
                    <br></br>
                  <Card sx={{maxWidth:'400px'}}>
                    <CardContent>
                  <Grid container spacing={2}>
<Grid item xs={2}>
<Avatar src={hostname+'/images/'+bidder.img} sx={{width:'50px',height:'50px',cursor:'pointer'}} onClick={e=>document.location='/profile/'+bidder.profile}></Avatar>
</Grid>
<Grid item xs={8}>
<Typography sx={{cursor:'pointer'}} variant={'h6'} onClick={e=>document.location='/profile/'+bidder.profile}>{bidder.biddername}</Typography>
<Typography>Time:{bidder.time} days</Typography>
</Grid>
<Grid item xs={2}>
                  <Typography>{bidder.price}$</Typography>
</Grid>
<Grid item xs={12}></Grid>
<Grid item xs={12}>
  <Typography>{bidder.details}</Typography>
</Grid>

</Grid>
                  
                  </CardContent>
                  <CardActions>
                  <Button onClick={e=>{
                      acceptbidrequest(pid,bidder.profile);
                    }} color="secondary">Accept</Button>
                  </CardActions>
                  </Card>
                  </div>
                ))}
              
              
            </div>
          )}
</Grid>

      </Grid>
    </div>
  );

    }




const PopupDialog = ({ open, onClose ,projectid}) => {
  const [money, setMoney] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');

  const handleMoneyChange = (event) => {
    setMoney(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleClose = () => {
    setMoney('');
    setTime('');
    setDetails('');
    onClose();
  };

  const handleSubmit = () => {
    
    
    bidrequest(money,time,details,projectid);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Bid this project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="money"
          label="Required Money"
          type="number"
          value={money}
          onChange={handleMoneyChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="details"
          label="Notes"
          multiline
          rows={4}
          value={details}
          onChange={handleDetailsChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="time"
          label="Required Time(In Days)"
          type="number"
          value={time}
          onChange={handleTimeChange}
          fullWidth
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};






let repeater=undefined;

const InboxView = ({msg,projectid}) => {
 
  const [messages, setMessages] = useState(msg);
  const [newMessage,setNewMessage]=useState('')
 
if(repeater==undefined){
  repeater=setInterval(()=>{
    loadmsg(projectid).then(da=>{
      setMessages(da);
    })
  },2000)
}

  const handleMessageSubmit=(e)=>{
    e.preventDefault()
    if(newMessage){
    sendmsg(projectid,newMessage).then(da=>{
      setNewMessage('')
    })
  }
  }
 

  return (
    <Card elevation={10} sx={{width:'400px',position:'absolute',bottom:'64px',right:'64px'}}>
      
      <CardContent >
    <Grid container sx={{
    width:'380px'
    }} spacing={2}>
      <Grid item xs={12}>
        <div style={{width:'100%',padding:'16px',backgroundColor:'yellow',position:'absolute',top:'0',left:'0'}}>
      <Typography variant="h5" color={'black'}>Inbox</Typography>
      </div>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
      <List sx={{
    height:'400px',
    width:'380px',
    overflowY: 'scroll',
    
  }}>
        {messages.map((message) => (
          <ListItem key={message.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            
          }}>
            {message.sender === localStorage.getItem('profile') ? (
              <div style={{
                
                color: 'black',
                
                maxWidth: '80%',
                alignSelf: 'flex-end',
              }}>
              <Card elevation={10} sx={{backgroundColor:'#FDF9EA',borderRadius:'20px' ,padding:'8px',}}>
                <CardContent>
              
                <Typography variant="h6">{message.msg}</Typography>
                <Typography variant="caption">You - {message.time}</Typography>
              
              </CardContent>
              </Card>
              </div>
            ) : (
              <div style={{
                
                color: 'black',
                maxWidth: '80%',
              }}>
                <Card elevation={10} sx={{backgroundColor:'white',borderRadius:'20px' ,padding:'8px',}}>
                <CardContent>
                <Typography variant="h6">{message.msg}</Typography>
                <Typography variant="caption">
                  {message.sender} - {message.time}
                </Typography>
                </CardContent>
                </Card>
              </div>
            )}
          </ListItem>
        ))}
      </List>
      </Grid>
      <Grid item xs={10}>
        <TextField
          type="text"
          fullWidth
          placeholder="Type your message"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
  <IconButton sx={{marginTop:'8px'}} onClick={handleMessageSubmit} >
    <Send color="primary"/>
  </IconButton>
  </Grid>
      </Grid>
      </CardContent>
      </Card>


  );
}







const ReviewDialog = ({ projectid,open, onClose }) => {
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    submitreview(projectid,rating,comment)
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle >Submit review about this worker</DialogTitle>
      <DialogContent >
        <Typography variant="subtitle1" gutterBottom>
          Rating:
        </Typography>
        <Box mb={2}>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={1}
          />
        </Box>
        <TextField
          
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions >
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
