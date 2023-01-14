import React, { useState, useEffect } from 'react';

import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  createTheme
} from '@mui/material';


const useStyles = createTheme({
  root: {
    flexGrow: 1
  },
  tabs: {
    borderRight: `1px solid black`,
  },
  tabContent: {
    padding: 2,
  },
  card: {
    height: '100%',
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  searchButton: {
    margin: 1,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  }
});


function SearchResultItem({ job }) {
    const classes = useStyles();
  
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {job.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {job.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View Details
          </Button>
        </CardActions>
      </Card>
    );
  }
  
function HomePage({setAppBar}) {
  setAppBar(false);
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [jobList, setJobList] = useState([]);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // fetch job and chat lists from server
    // fetch('/api/jobs')
    //   .then((res) => res.json())
    //   .then((data) => setJobList(data));
    // fetch('/api/chats')
    //   .then((res) => res.json())
    //   .then((data) => setChatList(data));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleTabChange}
            className={classes.tabs}
          >
            <Tab label="Search Jobs" />
            <Tab label="My Jobs" />
            <Tab label="Chat List" />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          {tab === 0 && (
            <div className={classes.tabContent}>
               <SearchTab/>
            </div>
          )}
          {tab === 1 && (
            <div className={classes.tabContent}>
              {jobList.map((job) => (
                <Card className={classes.card} key={job.id}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {job.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              ))}
           
           </div>
          )}
          {tab === 2 && (
            <div className={classes.tabContent}>
              {chatList.map((chat) => (
                <Card className={classes.card} key={chat.id}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                      {chat.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {chat.lastMessage}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Chat
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function SearchTab() {
    const classes = useStyles();
    const [skills, setSkills] = React.useState([]);
    const [keywords, setKeywords] = React.useState('');
  
    const handleSkillChange = (event) => {
      setSkills(event.target.value);
    };
  
    const handleKeywordsChange = (event) => {
      setKeywords(event.target.value);
    };
  
    const handleSearch = () => {
      // fetch search results from server using skills and keywords
    };
  
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Search Jobs
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={skills}
            onChange={handleSkillChange}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="css">CSS</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="keywords"
          label="Keywords"
          value={keywords}
          onChange={handleKeywordsChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.searchButton}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Grid container>
          {/* <SearchResults/> */}
        </Grid>
      </React.Fragment>
    );
  }
  function SearchResults({ jobs }) {
    return (
      <Grid container>
        {jobs.map((job) => (
          <SearchResultItem job={job} key={job.id} />
        ))}
      </Grid>
    );
  }



export default HomePage;
