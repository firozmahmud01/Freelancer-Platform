import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { loadallcomment, sendcomment } from "./AllApi";



export default function Main(){
    const [comment,setComment]=useState('');
    const [data,setData]=useState();
    const searchParams = new URLSearchParams(window.location.search);
    const pid = searchParams.get("pid")||undefined;
    if(!pid)document.location='/'
    if(!data){
        loadallcomment(pid).then(da=>{
            setData(da);
        })
    }
    return (<div style={{margin:'16px'}}><Grid container spacing={3}>
        <Grid item xs={11}>
               <TextField fullWidth value={comment} onChange={(e)=>{
                setComment(e.target.value);
               }} label="Write your comment here"></TextField>
        </Grid>
        <Grid item xs={1}>

            <Button variant="contained" onClick={()=>{
                if(comment.length<=0)return ;
                sendcomment(pid,comment)
            }} sx={{marginTop:'8px'}}>Send</Button>
        </Grid>
            <Grid item xs={12}></Grid>

            {data&&data.map((da,index)=>{
                return (<Grid key={da.uid} item xs={12}>
                    <div>
                        <Typography variant="h5" color={'skyblue'} sx={{cursor:'pointer'}} onClick={()=>document.location='/profile/'+da.profile}>{da.name}</Typography>
                        <Typography variant="h5" sx={{marginLeft:'16px'}} >{da.comment}</Typography>
                    </div>
                </Grid>)
            })}

    </Grid></div>)
}