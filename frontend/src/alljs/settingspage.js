import { AccountBox } from "@mui/icons-material";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
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
            <Button variant={"contained"} component="label" sx={{marginLeft:'16px',marginTop:'100%'}}>
                Choose
                <input hidden onChange={(e)=>{
                    imgToBase(e.target.files[0]).then(basedata=>[
                        setImage(basedata)
                    ])
                }} accept="image/*" type="file" />
                </Button>
        </Grid>
        
        <Grid item xs={12}>
            <Button sx={{marginTop:'16px'}} variant={"contained"}>Save</Button>
        </Grid>


        </Grid>)
}
function PortfolioSection(){

}

function PictureSection(){
return <div>
    <ProfilePictureSection/>
</div>
}

function ProfileSection(){
return <div>Test</div>
}
function EducationSection(){
return <div>Test</div>
}
function ExperienceSection(){
return <div>Test</div>
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