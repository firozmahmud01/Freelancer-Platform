import { Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getprofiledetails, getprojectdetails, getprojectlist, uploadproject } from "./AllApi";



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
      <Fab color="primary" aria-label="add" sx={{position:'fixed',bottom:'32px',right:'32px'}} onClick={handleClickOpen}>
        +
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="add-project-dialog-title">
        <DialogTitle id="add-project-dialog-title">Add Project</DialogTitle>
        <DialogContent >
          <TextField label="Project Title" value={title} onChange={(event) => setTitle(event.target.value)} margin="normal" />
          <TextField label="Project Details" value={details} onChange={(event) => setDetails(event.target.value)} margin="normal" />
          <TextField label="Price Range" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} margin="normal" />
          <TextField label="Skills" value={skills} onChange={(event) => setSkills(event.target.value)} margin="normal" />
          <input type="file" onChange={handleAddAttachment} />
          {attachments.map((attachment, index) => (
            <div key={index}>
              <Card sx={{width:'100px'}}><CardMedia sx={{height:'100px'}} image={attachment}> </CardMedia></Card>
            </div>
          ))}
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
    <div>
      <Typography variant="h4">Projects</Typography>
      <TextField
        label="Search projects"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      {filteredProjects.map((project) => (
        <Card key={project.uid}>
          <CardHeader
            title={project.title}
            subheader={`Published by ${project.publishername}`}
          />
          <CardContent>
            <Typography variant="body1">{project.details.substring(0,project.details.length>20?20:project.details.length)+'...'}</Typography>
            <Button
              variant="contained"
              color="primary"
              href={`/project?id=${project.uid}`}
            >
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
      <AddProjectButton/>
    </div>
  );

}