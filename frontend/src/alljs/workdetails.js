import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemText, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {acceptbidrequest, bidrequest, getprojectdetails, loadmsg, sendmsg} from './AllApi'


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
      <Typography variant="h2">{project.title}</Typography>
      <Typography variant="subtitle1">Price Range: {project.pricerange}</Typography>
      <Typography variant="body1">Details: {project.details}</Typography>
      <Typography variant="body1">Skills Required: {project.requirements}</Typography>
      <Typography variant="body1">Attachments: {project.attachments}</Typography>
      <ReviewDialog open={review} onClose={()=>setReview(false)}/>
      {localStorage.getItem('userType') != "worker"&&project.worker&&<Button variant="contained" onClick={()=>setReview(true)}>Project is Complete</Button>}
      {localStorage.getItem('userType') === "worker"&&!project.worker && (
        <Button variant="contained" color="primary" onClick={handleBid}>Bid</Button>
      )}
      {project.message&&<InboxView msg={project.message} projectid={pid}/>}
      {project?.biders?.length > 0 && (
        <div>
          <Typography variant="h3">Bidders:</Typography>
          <List>
            {project?.biders?.map((bidder) => (
              <ListItem key={bidder.uid}>
                <ListItemText primary={<Typography sx={{cursor:'pointer'}} onClick={e=>document.location='/profile/'+bidder.profile} >Name :{bidder.biddername}</Typography>} secondary={`Money Required: ${bidder.price}`} />
                <ListItemText primary={`Time Required: ${bidder.time} days`} secondary={`Details: ${bidder.details}`} />
                <ListItemButton ><Button onClick={e=>{
                  acceptbidrequest(pid,bidder.profile);
                }} variant="contained">Accept</Button></ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
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
      <DialogTitle>Add Bid</DialogTitle>
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
          id="time"
          label="Required Time"
          type="number"
          value={time}
          onChange={handleTimeChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="details"
          label="Sort Details"
          value={details}
          onChange={handleDetailsChange}
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <List sx={{
    flexGrow: 1,
    overflowY: 'scroll',
    marginBottom: 2,
  }}>
        {messages.map((message) => (
          <ListItem key={message.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: 1,
            marginRight: 4,
            marginLeft: 4,
          }}>
            {message.sender === localStorage.getItem('profile') ? (
              <div style={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '10px',
                padding: 2,
                maxWidth: '80%',
                alignSelf: 'flex-end',
              }}>
                <Typography variant="body2">{message.msg}</Typography>
                <Typography variant="caption">{message.time}</Typography>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#e1e1e1',
                borderRadius: '10px',
                padding: 1,
                maxWidth: '80%',
              }}>
                <Typography variant="body2">{message.msg}</Typography>
                <Typography variant="caption">
                  {message.sender} - {message.time}
                </Typography>
              </div>
            )}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleMessageSubmit} style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
  }}>
        <input
          type="text"
          style={{
            flexGrow: 1,
            marginRight: 1,
          }}
          placeholder="Type your message"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button style={{
    marginLeft: 1,
  }} type="submit">Send</button>
      </form>
    </div>
  );
}







const ReviewDialog = ({ open, onClose }) => {
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Send review data to API endpoint
    // ...
    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle >Submit Review</DialogTitle>
      <DialogContent >
        <Typography variant="subtitle1" gutterBottom>
          Rating:
        </Typography>
        <Box mb={2}>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
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
