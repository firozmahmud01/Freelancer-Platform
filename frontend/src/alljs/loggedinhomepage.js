import { Search, Upload } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getprofiledetails, getprojectdetails, getprojectlist, uploadproject, uploadvideo } from "./AllApi";


function VideoButton(){
  return <Fab color="primary" aria-label="add" variant="extended" sx={{color:'black',backgroundColor:'yellow',position:'fixed',bottom:'100px',right:'32px'}} onClick={()=>document.location='/videos'}>
  Videos
</Fab>
}
function UploadVideo(){
const [open,setOpen]=useState(false);
const [link,setLink]=useState('');
const handleSubmit=()=>{
  let data=link.split('=')
  if(data.length<=1){
    alert("Please insert a valid youtube link");
    return ;
  }
  uploadvideo(data[data.length-1])
  setOpen(false);
}
  return (
    <div>
  <Fab color="primary" aria-label="add" variant="extended" sx={{color:'black',backgroundColor:'yellow',position:'fixed',bottom:'32px',right:'32px'}} onClick={()=>setOpen(true)}>
  + Video
</Fab>

<Dialog open={open} onClose={()=>setOpen(false)} aria-labelledby="add-project-dialog-title">
        <DialogTitle id="add-project-dialog-title"><div style={{padding:'8px',paddingLeft:'16px',width:'100%',backgroundColor:'yellow',position:'absolute',top:'0',left:'0',right:'0'}}>Upload a video</div></DialogTitle>
        <DialogContent >
          <br></br>
          <br></br>
          <Grid container >
            <Grid item xs={12}>
          <TextField fullWidth label="Youtube Video Link" value={link} onChange={(event) => setLink(event.target.value)} margin="normal" />
            </Grid>
              
    
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
<Grid item xs={6}>
          <Button fullWidth onClick={()=>setOpen(false)} sx={{backgroundColor:'yellow',color:'black'}} color="primary">
            Cancel
          </Button>
</Grid>
<Grid item xs={6}>

          <Button fullWidth onClick={handleSubmit} sx={{backgroundColor:'yellow',color:'black'}} color="primary">
            Upload
          </Button>
</Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      </div>
)
}


const AddProjectButton = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [skills, setSkills] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddAttachment = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAttachments([...attachments, reader.result]);
    };
  };

  const handleSubmit = () => {
    // title,requirements,details,amountrange,attachments
    uploadproject(title,skills,details,priceRange,attachments);

    // Submit form data to backend API endpoint here

    handleClose();
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" variant="extended" sx={{color:'black',backgroundColor:'yellow',position:'fixed',bottom:'32px',right:'32px'}} onClick={handleClickOpen}>
        + CREATE
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="add-project-dialog-title">
        <DialogTitle id="add-project-dialog-title"><div style={{padding:'8px',paddingLeft:'16px',width:'100%',backgroundColor:'yellow',position:'absolute',top:'0',left:'0',right:'0'}}>Create new project</div></DialogTitle>
        <DialogContent >
          <br></br>
          <br></br>
          <Grid container >
            <Grid item xs={12}>
          <TextField fullWidth label="Project Title" value={title} onChange={(event) => setTitle(event.target.value)} margin="normal" />
            </Grid>
              <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label="Project Details" value={details} onChange={(event) => setDetails(event.target.value)} margin="normal" />
              </Grid>
<Grid item xs={12}>
          <TextField fullWidth label="Price Range" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} margin="normal" />
</Grid>
  <Grid item xs={12}>
          <TextField fullWidth label="Skills(Comma sperated)" value={skills} onChange={(event) => setSkills(event.target.value)} margin="normal" />
  </Grid>
    
          </Grid>
          <input type="file" onChange={handleAddAttachment} />
          {attachments.map((attachment, index) => (
            <div key={index}>
              <Card sx={{width:'100px'}}><CardMedia sx={{height:'100px'}} image={attachment}> </CardMedia></Card>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
<Grid item xs={6}>
          <Button fullWidth onClick={handleClose} sx={{backgroundColor:'yellow',color:'black'}} color="primary">
            Cancel
          </Button>
</Grid>
<Grid item xs={6}>

          <Button fullWidth onClick={handleSubmit} sx={{backgroundColor:'yellow',color:'black'}} color="primary">
            CREATE
          </Button>
</Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};








export default function Main(){
    
  const [projects, setProjects] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q")||undefined;
  if(!projects){

    getprojectlist(q).then(da=>{
      
      setProjects(da);
    })
    return <div></div>
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project?.title?.toLowerCase().includes(searchTerm.toLowerCase())||project?.details?.toLowerCase().includes(searchTerm.toLowerCase())||project?.requirements?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{padding:'32px'}}>
      <Typography variant="h4" style={{margin:'16px',textAlign:'center'}}>{q&&q=='myproject'?'Your':'All'} Projects</Typography>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
       
        <Grid item xs={10}>
      <TextField
        label="Search projects"
        placeholder='Type here'
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
</Grid>

      <Grid item xs={1}></Grid>
      {filteredProjects.map((project) => (
        <Grid key={project.uid} item xs={3}>
        <Card elevation={10} sx={{maxWidth:'100%'}}>
          <CardHeader
            title={project.title}
            subheader={`Published by ${project.publishername}`}
          />
          <CardContent>
            <Typography variant="body1">{project.details.substring(0,project.details.length>60?60:project.details.length)+'...'}</Typography>
            </CardContent>
            <CardActions>
            <Button
            sx={{color:'yellow'}}
              
              href={`/project?id=${project.uid}`}
            >
              Open Details
            </Button>
            </CardActions>
        </Card>
        </Grid>
      ))}
</Grid>
      {(localStorage.getItem('userType')!='worker'&&<AddProjectButton/>)}
      {(localStorage.getItem('userType')=='worker'?<UploadVideo/>:<VideoButton/>)}
    </div>
  );

}