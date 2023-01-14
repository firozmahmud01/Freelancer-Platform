import { Button, Checkbox, createTheme, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';


const useStyles = createTheme({
  formControl: {
    margin: 2,
  },
  saveButton: {
    marginTop: 2,
    
  },
  selectedSkills: {
    marginTop: 2,
  },
});

function SkillsPage({setAppBar}) {
setAppBar(false);
  const classes = useStyles();
  const [webDevelopmentSkills, setWebDevelopmentSkills] = React.useState([]);
  const [graphicDesignSkills, setGraphicDesignSkills] = React.useState([]);
  const [animationSkills, setAnimationSkills] = React.useState([]);
  const [mobileDevelopmentSkills, setMobileDevelopmentSkills] = React.useState([]);
  const [desktopDevelopmentSkills, setDesktopDevelopmentSkills] = React.useState([]);
  const [photoEditingSkills, setPhotoEditingSkills] = React.useState([]);
  
  
  const handleCancel = () => {
    // resetForm();
    // Navigate back to the previous page or perform some other cancel action
  };

  const handlePhotoEditingSkillChange = (event) => {
    const newPhotoEditingSkills = event.target.value;
    if (photoEditingSkills.includes(newPhotoEditingSkills)) {
      setPhotoEditingSkills(photoEditingSkills.filter((skill) => skill !== newPhotoEditingSkills));
    } else {
      setPhotoEditingSkills([...photoEditingSkills, newPhotoEditingSkills]);
    }
  };
  const handleWebDevelopmentSkillChange = (event) => {
    const newSkills = [...webDevelopmentSkills];
    if (event.target.checked) {
      newSkills.push(event.target.value);
    } else {
      newSkills.splice(newSkills.indexOf(event.target.value), 1);
    }
    setWebDevelopmentSkills(newSkills);
  };

  const handleGraphicDesignSkillChange = (event) => {
    const newSkills = [...graphicDesignSkills];
    if (event.target.checked) {
      newSkills.push(event.target.value);
    } else {
      newSkills.splice(newSkills.indexOf(event.target.value), 1);
    }
    setGraphicDesignSkills(newSkills);
  };

  const handleAnimationSkillChange = (event) => {
    const newSkills = [...animationSkills];
    if (event.target.checked) {
      newSkills.push(event.target.value);
    } else {
      newSkills.splice(newSkills.indexOf(event.target.value), 1);
    }
    setAnimationSkills(newSkills);
  };

  const handleMobileDevelopmentSkillChange = (event) => {
    const newSkills = [...mobileDevelopmentSkills];
    if (event.target.checked) {
      newSkills.push(event.target.value);
    } else {
      newSkills.splice(newSkills.indexOf(event.target.value), 1);
    }
    setMobileDevelopmentSkills(newSkills);
};

const handleDesktopDevelopmentSkillChange = (event) => {
  const newSkills = [...desktopDevelopmentSkills];
  if (event.target.checked) {
    newSkills.push(event.target.value);
  } else {
    newSkills.splice(newSkills.indexOf(event.target.value), 1);
  }
  setDesktopDevelopmentSkills(newSkills);
};

const handleSave = () => {
  // Save the selected skills to the database
};

return (
    <div style={{margin:'20px'}}>
        <Typography variant='h4'>Choose all skill matchs to you:</Typography>
  <React.Fragment>
    <FormControl component="fieldset" className={classes.formControl}>
      <Typography variant="h6">Web Development</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={webDevelopmentSkills.includes('html')}
              onChange={handleWebDevelopmentSkillChange}
              value="html"
            />
          }
          label="HTML"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={webDevelopmentSkills.includes('css')}
              onChange={handleWebDevelopmentSkillChange}
              value="css"
            />
          }
          label="CSS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={webDevelopmentSkills.includes('javascript')}
              onChange={handleWebDevelopmentSkillChange}
              value="javascript"
            />
          }
          label="JavaScript"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={webDevelopmentSkills.includes('react')}
              onChange={handleWebDevelopmentSkillChange}
              value="react"
            />
          }
          label="React"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={webDevelopmentSkills.includes('nodejs')}
              onChange={handleWebDevelopmentSkillChange}
              value="nodejs"
            />
          }
          label="Node.js"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={webDevelopmentSkills.includes('express')}
                onChange={handleWebDevelopmentSkillChange}
                value="express"
              />
            }
            label="Express"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={webDevelopmentSkills.includes('mysql')}
                onChange={handleWebDevelopmentSkillChange}
                value="mysql"
              />
            }
            label="MySQL"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={webDevelopmentSkills.includes('mongodb')}
                onChange={handleWebDevelopmentSkillChange}
                value="mongodb"
              />
            }
            label="MongoDB"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={webDevelopmentSkills.includes('php')}
                onChange={handleWebDevelopmentSkillChange}
                value="php"
              />
            }
            label="PHP"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={webDevelopmentSkills.includes('python')}
                onChange={handleWebDevelopmentSkillChange}
                value="python"
              />
            }
            label="Python"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h6">Graphic Design</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={graphicDesignSkills.includes('photoshop')}
                onChange={handleGraphicDesignSkillChange}
                value="photoshop"
              />
            }
            label="Photoshop"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={graphicDesignSkills.includes('illustrator')}
                onChange={handleGraphicDesignSkillChange}
                value="illustrator"
              />
            }
            label="Illustrator"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={graphicDesignSkills.includes('indesign')}
                onChange={handleGraphicDesignSkillChange}
                value="indesign"
              />
            }
            label="InDesign"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={graphicDesignSkills.includes('affinitydesigner')}
                onChange={handleGraphicDesignSkillChange}
                value="affinitydesigner"
              />
            }
            label="Affinity Designer"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={graphicDesignSkills.includes('coreldraw')}
                onChange={handleGraphicDesignSkillChange}


                value="coreldraw"
              />
            }
            label="CorelDRAW"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h6">Animation</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={animationSkills.includes('2danimation')}
                onChange={handleAnimationSkillChange}
                value="2danimation"
              />
            }
            label="2D Animation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={animationSkills.includes('3danimation')}
                onChange={handleAnimationSkillChange}
                value="3danimation"
              />
            }
            label="3D Animation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={animationSkills.includes('motiongraphics')}
                onChange={handleAnimationSkillChange}
                value="motiongraphics"
              />
            }
            label="Motion Graphics"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h6">Mobile Development</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={mobileDevelopmentSkills.includes('android')}
                onChange={handleMobileDevelopmentSkillChange}
                value="android"
              />
            }
            label="Android"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mobileDevelopmentSkills.includes('ios')}
                onChange={handleMobileDevelopmentSkillChange}
                value="ios"
              />
            }
            label="iOS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mobileDevelopmentSkills.includes('reactnative')}
                onChange={handleMobileDevelopmentSkillChange}
                value="reactnative"
              />
            }
            label="React Native"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mobileDevelopmentSkills.includes('flutter')}
                onChange={handleMobileDevelopmentSkillChange}
                value="flutter"
              />
            }
            label="Flutter"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h6">Desktop Development</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={desktopDevelopmentSkills.includes('csharp')}
                onChange={handleDesktopDevelopmentSkillChange}
                value="csharp"
              />
            }
            label="C#"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={desktopDevelopmentSkills.includes('java')}
                onChange={handleDesktopDevelopmentSkillChange}
                    value="java"
                  />
                }
                label="Java"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={desktopDevelopmentSkills.includes('python')}
                    onChange={handleDesktopDevelopmentSkillChange}
                    value="python"
                  />
                }
                label="Python"
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <Typography variant="h6">Photo Editing</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photoEditingSkills.includes('photoshop')}
                    onChange={handlePhotoEditingSkillChange}
                    value="photoshop"
                  />
                }
                label="Photoshop"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photoEditingSkills.includes('lightroom')}
                    onChange={handlePhotoEditingSkillChange}
                    value="lightroom"
                  />
                }
                label="Lightroom"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photoEditingSkills.includes('affinityphoto')}
                    onChange={handlePhotoEditingSkillChange}
                    value="affinityphoto"
                  />
                }
                label="Affinity Photo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photoEditingSkills.includes('gimp')}
                    onChange={handlePhotoEditingSkillChange}
                    value="gimp"
                  />
                }
                label="GIMP"
              />
            </FormGroup>
          </FormControl>
          <div className={classes.selectedSkills}>
            <Typography variant="h6">Selected Skills:</Typography>
            <Typography>
              {webDevelopmentSkills.join(', ')}
              {graphicDesignSkills.length > 0 && `, ${graphicDesignSkills.join(', ')}`}
              {animationSkills.length > 0 && `, ${animationSkills.join(', ')}`}
              {mobileDevelopmentSkills.length > 0 && `, ${mobileDevelopmentSkills.join(', ')}`}
              {desktopDevelopmentSkills.length > 0 && `, ${desktopDevelopmentSkills.join(', ')}`}
              {photoEditingSkills.length > 0 && `, ${photoEditingSkills.join(', ')}`}
            </Typography>
          </div>
          <div className={classes.buttons}>
            <Button variant="contained" style={{marginRight:'10px'}} color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </React.Fragment>
        </div>
      );
    };
    
    export default SkillsPage;
    