import { AccountBox, AddBox, AddCircleOutline, Delete, LibraryAdd } from "@mui/icons-material";
import { Button, Card, CardMedia, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";


async function loadProfileData(){

}


function imgToBase(url){
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            resolve(fileLoadedEvent.target.result)
        }
        fileReader.readAsDataURL(url);
    });

}


function ProfilePictureSection({img}){
    const [image,setImage]=useState(img);
    
    

    return (<Grid container >
        <Grid item xs={12}>
<Typography variant="h6">Update Profile Picture:</Typography>
        </Grid>
        <Grid item>
        {image&&(<Card sx={{marginLeft:'16px',marginTop:'8px',width:'200px'}}>
            <CardMedia sx={{height:'200px'}} image={image}  />
        </Card>)}
        {!image&&<AccountBox sx={{width:'200px',marginTop:'8px',marginLeft:'16px',height:'200px'}}/>}
        </Grid>
        <Grid item>
            <Button color="secondary" variant={"contained"} component="label" sx={{marginLeft:'16px',marginTop:'100%'}}>
                Choose
                <input hidden onChange={(e)=>{
                    imgToBase(e.target.files[0]).then(basedata=>[
                        setImage(basedata)
                    ])
                }} accept="image/*" type="file" />
                </Button>
        </Grid>
        
        <Grid item xs={12}>
            <Button color="secondary" sx={{marginTop:'16px',marginLeft:'16px'}} onClick={(e)=>{
                if(img==image){
                    return ;
                }


            }} variant={"contained"}>Save</Button>
        </Grid>


        </Grid>)
}


function PortfolioSection({images}){
    let all=images?.map((item,index)=>{
        return (<Grid xs={3} item keys={index}>
          <Card sx={{maxWidth:'200px'}}>
            <CardMedia sx={{height:'200px'}} image={item}></CardMedia>
          </Card>
        </Grid>)
      })
    return <Paper elevation={10} sx={{marginTop:'32px', padding:'8px',width:'94%'}}>
    <Typography variant="h5"><b>All Portfolio Pictures:</b></Typography>
    <Grid container spacing={3}>
        {all}
        <Grid xs={3} item>
            <IconButton >
            <AddBox color="secondary" sx={{height:'150px',width:'150px'}}></AddBox>
            </IconButton>
        </Grid>
    </Grid>
    </Paper>
}

function PictureSection(){
return <div>
    <ProfilePictureSection/>
    
    <PortfolioSection/>
    
</div>
}

function ProfileSection(){
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [bio, setBio] = useState('');
      const [address, setAddress] = useState('');
      const [hourlyRate, setHourlyRate] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/updateprofile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            bio,
            address,
            hourlyRate,
          }),
        });
        // handle the response as necessary
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <TextField
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
          <TextField
            label="Address"
            multiline
            rows={4}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            label="Hourly Rate"
            type="number"
            value={hourlyRate}
            onChange={(event) => setHourlyRate(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </form>
      );
        
}
function EducationSection(){
    
      const [education, setEducation] = useState([
        { programName: '', schoolName: '', startYear: '', startMonth: '', endYear: '', endMonth: '', result: '' },
      ]);
    
      const handleAddEducation = () => {
        setEducation([
          ...education,
          { programName: '', schoolName: '', startYear: '', startMonth: '', endYear: '', endMonth: '', result: '' },
        ]);
      };
    
      const handleRemoveEducation = (index) => {
        const newEducation = [...education];
        newEducation.splice(index, 1);
        setEducation(newEducation);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/updateeducation', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ education }),
        });
        // handle the response as necessary
      };
    
      return (
        <form onSubmit={handleSubmit}>
          {education.map((edu, index) => (
            <div key={index}>
              <Typography variant="h6">Education {index + 1}</Typography>
              <TextField
                label="Program Name"
                value={edu.programName}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, programName: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="School/College Name"
                value={edu.schoolName}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, schoolName: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Start Year"
                type="number"
                value={edu.startYear}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, startYear: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Start Month"
                type="number"
                value={edu.startMonth}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, startMonth: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <Typography variant="body1">to</Typography>
              <TextField
                label="End Year"
                type="number"
                value={edu.endYear}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, endYear: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="End Month"
                type="number"
                value={edu.endMonth}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, endMonth: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Result"
                value={edu.result}
                onChange={(event) =>
                  setEducation([
                    ...education.slice(0, index),
                    { ...edu, result: event.target.value },
                    ...education.slice(index + 1),
                  ])
                }
                required
              />
              <IconButton onClick={() => handleRemoveEducation(index)}>
                <Delete />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddEducation}>
            <AddCircleOutline />
          </IconButton>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      );
     
}



function ExperienceSection(){
   
      const [experiences, setExperiences] = useState([
        { title: '', startYear: '', startMonth: '', endYear: '', endMonth: '', details: '' },
      ]);
    
      const handleAddExperience = () => {
        setExperiences([...experiences, { title: '', startYear: '', startMonth: '', endYear: '', endMonth: '', details: '' }]);
      };
    
      const handleRemoveExperience = (index) => {
        const newExperiences = [...experiences];
        newExperiences.splice(index, 1);
        setExperiences(newExperiences);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/updateexperience', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ experiences }),
        });
        // handle the response as necessary
      };
    
      return (
        <form onSubmit={handleSubmit}>
          {experiences.map((experience, index) => (
            <div key={index}>
              <Typography variant="h6">Experience {index + 1}</Typography>
              <TextField
                label="Title"
                value={experience.title}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, title: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Start Year"
                type="number"
                value={experience.startYear}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, startYear: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Start Month"
                type="number"
                value={experience.startMonth}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, startMonth: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
                required
              />
              <Typography variant="body1">to</Typography>
              <TextField
                label="End Year"
                type="number"
                value={experience.endYear}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, endYear: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="End Month"
                type="number"
                value={experience.endMonth}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, endMonth: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
                required
              />
              <TextField
                label="Details"
                multiline
                rows={4}
                value={experience.details}
                onChange={(event) =>
                  setExperiences([
                    ...experiences.slice(0, index),
                    { ...experience, details: event.target.value },
                    ...experiences.slice(index + 1),
                  ])
                }
              />
              <IconButton onClick={() => handleRemoveExperience(index)}>
                <Delete />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddExperience}>
            <AddCircleOutline />
          </IconButton>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      );
          
}

export default function Main(){

    return (<Grid sx={{margin:'16px'}} container spacing={1}>
        <Grid item xs={12}><Typography variant="h5"><b>Picture Update Section:</b></Typography></Grid>
        <Grid item xs={12}><PictureSection/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography variant="h5"><b>Profile Update Section:</b></Typography></Grid>
        <Grid item xs={12}><ProfileSection/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography  variant="h5"><b>Experience Update Section:</b></Typography></Grid>
        <Grid item xs={12}><ExperienceSection/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography  variant="h5"><b>Education Update Section:</b></Typography></Grid>
        <Grid item xs={12}><EducationSection/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid></Grid>
    </Grid>)
}