

import { Card, CardMedia } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../cssfiles/loginfile.css'
import HomeBack from '../image/homeback.jpeg'




function Signup({setCurrentPage}){
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [workerOrClient, setWorkerOrClient] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formError, setFormError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValid) {
      document.location='/option';
    } else {
      alert(JSON.stringify(formError));
      alert('Sorry you missed something...');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let errors = { ...formError };

    switch (name) {
      case 'firstName':
        setFirstName(value);
        errors.firstName = value ? '' : 'First name is required';
        break;
      case 'lastName':
        setLastName(value);
        errors.lastName = value ? '' : 'Last name is required';
        break;
      case 'gender':
        setGender(value);
        errors.gender = value ? '' : 'Gender is required';
        break;
      case 'email':
        setEmail(value);
        errors.email = value ? '' : 'Email is required';
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        errors.phoneNumber = value ? '' : 'Phone number is required';
        break;
      case 'password':
        setPassword(value);
        errors.password = value ? '' : 'Password is required';
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        errors.confirmPassword = value ? '' : 'Confirm password is required';
        break;
      case 'workerOrClient':
        setWorkerOrClient(value);
        errors.workerOrClient = value ? '' : 'Worker or client is required';
        break;
      default:
        
        break;
    }

    // Check if form is valid
    setFormValid(
      !Object.values(errors).some((error) => error !== '') &&
      password === confirmPassword
    );
    setFormError(errors);
  };

  return (
    
    <form onSubmit={handleSubmit} style={{width:'500px'}}>
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        id="first-name"
        name="firstName"
        value={firstName}
        onChange={handleInputChange}
      />
      {formError.firstName && <p>{formError.firstName}</p>}
      <br />
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        id="last-name"
        name="lastName"
        value={lastName}
        onChange={handleInputChange}
      />
      {formError.lastName && <p>{formError.lastName}</p>}
      <br />
      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={gender}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {formError.gender && <p>{formError.gender}</p>}
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      {formError.email && <p>{formError.email}</p>}
      <br />
      <label htmlFor="phone-number">Phone Number:</label>
      <input
        type="text"
        id="phone-number"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      {formError.phoneNumber && <p>{formError.phoneNumber}</p>}
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleInputChange}
      />
      {formError.password && <p>{formError.password}</p>}
      <br />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleInputChange}
      />
      {formError.confirmPassword && <p>{formError.confirmPassword}</p>}
      <br />
      <label htmlFor="worker-or-client">Worker or Client:</label>
      <input
        type="radio"
        id="worker"
        name="workerOrClient"
        value="worker"
        checked={workerOrClient === 'worker'}
        onChange={handleInputChange}
      />
      Worker
      <input
        type="radio"
        id="client"
        name="workerOrClient"
        value="client"
        checked={workerOrClient === 'client'}
        onChange={handleInputChange}
      />
      Client
      {formError.workerOrClient && <p>{formError.workerOrClient}</p>}
      <br />
      <input type="submit" value="Sign Up" />
      <br/>
      <div style={{marginLeft:'50%',transform:'translateX(-50%)'}}>
      <p>Already have an account? <Link onClick={(e)=>{
          e.preventDefault();
           setCurrentPage('login');
      }}>Login</Link>
    </p>
    </div>
      
      </form>
  )


}





function Login({setCurrentPage}){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Validate the form values
      if (!username || !password) {
        setError('Please enter a username and password');
        return;
      }
  
      // Clear the error message
      setError('');
  
      // Submit the form
      console.log('Submitting form with username:', username, 'and password:', password);
    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <div className="error">{error}</div>}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
        <p>
        Don't have an account? <Link onClick={(e)=>{
            e.preventDefault();
            setCurrentPage('signup')
        }}>Sign up</Link>
      </p>
      </div>
    );
    
    
}

function Checker(){
    const [currentPage, setCurrentPage] = useState('login');

  // Render the appropriate page based on the value of currentPage
  switch (currentPage) {
    case 'login':
        return (<div style={{marginTop:'50%',transform:'translateY(-50%)'}}>
    <Login setCurrentPage={setCurrentPage}/>
    </div>);
      
    case 'signup':
      return (<div style={{position:'absolute',marginTop:'50%',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
      <Signup setCurrentPage={setCurrentPage}/>
  </div>)
    default:
      return <div>Error: Invalid page</div>;
  }
}

export default function Main({setAppBar}){
    setAppBar(false);

    return (
        <div>
            <Card sx={{position:'fixed' ,top:0,left:0,right:0,bottom:0,height:'100%',width:'100%'}}>
        <CardMedia sx={{height:"100%", opacity:0.4}} image={HomeBack}/>
    </Card> 
        <Checker/>
    </div>
    )


    }