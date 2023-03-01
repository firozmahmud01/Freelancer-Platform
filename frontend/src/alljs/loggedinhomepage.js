import { Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";


export default function Main(){
    
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Card key={project.id}>
          <CardHeader
            title={project.title}
            subheader={`Published by ${project.publisher}`}
          />
          <CardContent>
            <Typography variant="body1">{project.shortDetails}</Typography>
            <Button
              variant="contained"
              color="primary"
              href={`/projects/${project.id}`}
            >
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

}