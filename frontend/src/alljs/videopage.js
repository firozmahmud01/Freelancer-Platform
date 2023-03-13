import { Grid } from "@mui/material";
import { useState } from "react"
import { videolist } from "./AllApi";

export default function Main(){
    const [list,setList]=useState();
    if(!list){
        videolist().then(d=>{
            let res=[]
            for(let da of d){
                res.push(<Grid key={da.uid} item xs={3}>
                    <iframe 
src={"https://www.youtube.com/embed/"+da.link}>
</iframe>
                </Grid>)
            }
            setList(res);
        })
        return <div></div>
    }
    return (
        <div style={{margin:'32px'}}>
    <Grid container spacing={3}>
        {list}
    </Grid>
    </div>)
    }