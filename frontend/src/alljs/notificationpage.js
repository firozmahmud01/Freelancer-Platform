import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { loadnotification } from "./AllApi";



export default function Main(){
    const [data,setData]=useState();
    if(!data){
        loadnotification().then(da=>{
            setData(da);
        })
    }


    return (<Grid container spacing={2}>
        {data&&data.map((da,index)=>{
            return (<Grid key={da.uid} item xs={12}>
                <div>
                <hr></hr>
                <div style={{margin:'16px',cursor:'pointer'}} onClick={()=>document.location='/project?id='+da.projectid}>
                    <Typography color={'blue'} variant="h5">{da.projectname}</Typography>
                    <Typography sx={{marginLeft:'16px'}}>{da.details}</Typography>
                    </div>
                    <hr></hr>
                </div>
            </Grid>)
        })}
    </Grid>)


}