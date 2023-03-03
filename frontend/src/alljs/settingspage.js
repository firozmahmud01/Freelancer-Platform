import { AccountBox, AddBox, AddCircleOutline, Delete, LibraryAdd } from "@mui/icons-material";
import { Button, Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { getprofiledetails, hostname, updateprofiledetails } from "./AllApi";





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
    const [image,setImage]=useState(hostname+'/images/'+img);
    
    const handleSaveImage=async()=>{
        await updateprofiledetails({img:image})
    }

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
                    imgToBase(e.target.files[0]).then(basedata=>{
                        setImage(basedata)
                })
                }} accept="image/*" type="file" />
                </Button>
        </Grid>
        
        <Grid item xs={12}>
            <Button color="secondary" sx={{marginTop:'16px',marginLeft:'16px'}} onClick={(e)=>{
                if(img==image){
                    return ;
                }
                handleSaveImage();

            }} variant={"contained"}>Save</Button>
        </Grid>


        </Grid>)
}


function PortfolioSection({images}){
  const [open,setOpen]=useState(false);
  const [image,setImage]=useState()
  
    let all=images?.split(
      ','
    )?.map((item,index)=>{
        return (<Grid xs={3} item keys={index}>
          <Card sx={{maxWidth:'200px'}}>
            <CardMedia sx={{height:'200px'}} image={hostname+'/images/'+item}></CardMedia>
          </Card>
        </Grid>)
      })
    return (<div>
      <input hidden id="imagechooser" onChange={(e)=>{
                    imgToBase(e.target.files[0]).then(basedata=>{
                        setImage(basedata);
                        setOpen(true);
      })
                }} accept="image/*" type="file"/>
                <UploadCardDialog open={open} setOpen={setOpen} image={image}/>
    <Paper elevation={10} sx={{marginTop:'64px',marginLeft:'12%', padding:'32px',width:'75%'}}>
    <Typography variant="h5"><b>All Portfolio Pictures:</b></Typography>
    
                
    <Grid container sx={{marginTop:'32px'}} spacing={2}>
        {all}
        <Grid xs={3} item>
            <IconButton onClick={e=>document.getElementById('imagechooser').click()}>
            <AddBox color="secondary" sx={{height:'150px',width:'150px'}}></AddBox>
            </IconButton>
        </Grid>
    </Grid>
    </Paper>
    </div>)
}

function PictureSection({img,portfolio}){
return <div>
    <ProfilePictureSection img={img}/>
    
    <PortfolioSection images={portfolio}/>
    
</div>
}




const UploadCardDialog = ({ open,setOpen,image}) => {
  

  const handleUpload = () => {
    updateprofiledetails({portfolio:image})
  };

  
  return (
    <Dialog open={open} onClose={e=>{
      setOpen(false)
    }}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <img
            src={image}
            title="Portfolio Image"
          />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};



function ProfileSection({names,emails,bios,details,hourlyrate,addres}){
      const [name, setName] = useState(names||'');
      const [email, setEmail] = useState(emails||'');
      const [password, setPassword] = useState('');
      const [bio, setBio] = useState(bios||'');
      const [detail,setDetails]=useState(details||'')
      const [address, setAddress] = useState(addres||'');
      const [hourlyRate, setHourlyRate] = useState(hourlyrate||'');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        await updateprofiledetails({
          name,email,pass:password,'details':detail,'skills':bio,address,'hourlyrate':hourlyRate
        })


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
            label="About Your self"
            value={detail}
            multiline
            elevation={3}
            onChange={(event) => setDetails(event.target.value)}
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
            label="Skills(Comma Separated!)"
            multiline
            required
            rows={4}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
          <TextField
            label="Address"
            multiline
            required
            rows={4}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            label="Hourly Rate"
            type="number"
            required
            value={hourlyRate}
            onChange={(event) => setHourlyRate(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </form>
      );
        
}
function EducationSection({educat}){
      let data;
      if(educat){
        data=JSON.parse(educat);
      }
    
      const [education, setEducation] = useState(data||[
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
        await updateprofiledetails({'education':JSON.stringify(education)})
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



function ExperienceSection({exper}){
      let data;
      if(exper){
        data=JSON.parse(exper);
      }
      const [experiences, setExperiences] = useState(data||[
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
        await updateprofiledetails({'experience':JSON.stringify(experiences)})
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
                required
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
    const [data,setData]=useState()
    if(!data){
      getprofiledetails(localStorage.getItem('profile')).then(da=>{
        
        setData(da);
      })
      return <div></div>
    }

    return (<Grid sx={{margin:'16px'}} container spacing={1}>
        <Grid item xs={12}><Typography variant="h5"><b>Picture Update Section:</b></Typography></Grid>
        <Grid item xs={12}><PictureSection img={data.img} portfolio={data.portfolio}/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography variant="h5"><b>Profile Update Section:</b></Typography></Grid>
        <Grid item xs={12}><ProfileSection names={data.name} emails={data.email} bios={data.skills} details={data.details} hourlyrate={data.hourlyrate} addres={data.address}/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography  variant="h5"><b>Experience Update Section:</b></Typography></Grid>
        <Grid item xs={12}><ExperienceSection exper={data.experience}/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}><Typography  variant="h5"><b>Education Update Section:</b></Typography></Grid>
        <Grid item xs={12}><EducationSection educat={data.education}/></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid></Grid>
    </Grid>)
}