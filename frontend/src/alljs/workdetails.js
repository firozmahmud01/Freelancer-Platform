import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {getprojectdetails} from './AllApi'


export default function Main(){
   const [project,setProject]=useState()
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
      <PopupDialog open={open} onClose={()=>setOpen(false)}/>
      <Typography variant="h2">{project.title}</Typography>
      <Typography variant="subtitle1">Price Range: {project.pricerange}</Typography>
      <Typography variant="body1">Details: {project.details}</Typography>
      <Typography variant="body1">Skills Required: {project.requirements}</Typography>
      <Typography variant="body1">Attachments: {project.attachments}</Typography>
      {localStorage.getItem('userType') === "worker" && (
        <Button variant="contained" color="primary" onClick={handleBid}>Bid</Button>
      )}
      {project?.bids?.length > 0 && (
        <div>
          <Typography variant="h3">Bidders:</Typography>
          <List>
            {project?.bids?.map((bidder) => (
              <ListItem key={bidder.id}>
                <ListItemText primary={`Name: ${bidder.name}`} secondary={`Money Required: ${bidder.money}`} />
                <ListItemText primary={`Time Required: ${bidder.time}`} secondary={`Bio: ${bidder.bio}`} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );

    }




const PopupDialog = ({ open, onClose }) => {
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
    // handle form submission here
    console.log('Required money:', money);
    console.log('Required time:', time);
    console.log('Sort details:', details);
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






const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    // Here you would make an API call to retrieve the user's messages
    // and update the messages state with the response data
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    // Here you would make an API call to send the message
    // and add the message to the messages state after success response
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        body: JSON.stringify({ recipient, messageBody }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setShowDialog(false);
      setRecipient("");
      setMessageBody("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setShowDialog(true)}>Compose</Button>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText primary={message.sender} secondary={message.subject} />
          </ListItem>
        ))}
      </List>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the recipient and message details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Recipient"
            fullWidth
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={handleSendMessage} color="primary">Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};









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
